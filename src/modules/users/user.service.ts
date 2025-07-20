import { Repository } from "typeorm";

import { AppDataSource } from "@/config/database.config";
import { AppError } from "@/common/error.response";
import { HttpStatusCode } from "@/constants/status-code";
import { IPaginationParams } from "@/utils/pagination";

import { User } from "./entities/user.entity";
import { UserStatus } from "./enums/user.enum";

// Import enums
import { RoleType } from "@/constants/role-type";
import { Gender } from "./enums/user.enum";
import { Role } from "@/modules/roles/entities/role.entity";

export interface UserListItem {
  username: string;
  fullname: string;
  roleType: RoleType;
}

export interface UserDetail {
  username: string;
  email?: string;
  fullname: string;
  dob: Date;
  phone_number?: string;
  gender?: Gender;
  date_attended: Date;
  roleType?: RoleType;
  status: UserStatus;
}

export interface UpdateUserData {
  fullname?: string;
  email?: string;
  dob?: Date;
  phone_number?: string;
  gender?: Gender;
  date_attended?: Date;
  roleType?: RoleType;
  status?: UserStatus;
}

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  private getBaseQuery() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role') // Join với role để có thể truy cập role_type
      .where('user.is_deleted = :isDeleted', { isDeleted: false })
      .orderBy('user.create_at', 'DESC');
  }

  async getPaginatedUsers(
    paginationParams: IPaginationParams,
    status?: UserStatus
  ): Promise<{ items: UserListItem[]; total: number }> {
    const { skip, limit } = paginationParams;
    
    const query = this.getBaseQuery();

    if (status) {
      query.andWhere('user.status = :status', { status });
    }
    
    const [users, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const items = users.map(user => ({
      username: user.username,
      fullname: user.fullname,
      roleType: (user.role?.role_id as RoleType) || RoleType.ADMIN
    }));

    return { items, total };
  }

  async getDetailUser(username: string): Promise<UserDetail> {
    const user = await this.getBaseQuery()
      .andWhere('user.username = :username', { username })
      .getOne();

    if (!user) {
      throw new AppError(
        `User with username ${username} not found`,
        HttpStatusCode.NOT_FOUND,
        'USER_NOT_FOUND'
      );
    }

    return {
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      dob: user.dob,
      phone_number: user.phone_number,
      gender: user.gender,
      date_attended: user.date_attended,
      roleType: user.role?.role_id as RoleType, 
      status: user.status
    };
  }

  async editUserDetail(
    username: string, 
    updateData: UpdateUserData
  ): Promise<UserDetail> {
    const existingUser = await this.getBaseQuery()
      .andWhere('user.username = :username', { username })
      .getOne();

    if (!existingUser) {
      throw new AppError(
        `User with username ${username} not found`,
        HttpStatusCode.NOT_FOUND,
        'USER_NOT_FOUND'
      );
    }

    if (updateData.status && !Object.values(UserStatus).includes(updateData.status)) {
      throw new AppError(
        `Invalid status value: ${updateData.status}`,
        HttpStatusCode.BAD_REQUEST,
        'INVALID_STATUS'
      );
    }

    if (updateData.gender && !Object.values(Gender).includes(updateData.gender)) {
      throw new AppError(
        `Invalid gender value: ${updateData.gender}`,
        HttpStatusCode.BAD_REQUEST,
        'INVALID_GENDER'
      );
    }

    if (updateData.roleType && !Object.values(RoleType).includes(updateData.roleType)) {
      throw new AppError(
        `Invalid roleType value: ${updateData.roleType}`,
        HttpStatusCode.BAD_REQUEST,
        'INVALID_ROLE_TYPE'
      );
    }

    // 3. If email is being updated, check for uniqueness
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: updateData.email })
        .andWhere('user.username != :username', { username })
        .andWhere('user.is_deleted = :isDeleted', { isDeleted: false })
        .getOne();

      if (emailExists) {
        throw new AppError(
          `Email ${updateData.email} is already in use`,
          HttpStatusCode.BAD_REQUEST,
          'EMAIL_ALREADY_EXISTS'
        );
      }
    }

    // 4. Update user data
    const updateFields: any = {};
    
    if (updateData.fullname !== undefined) updateFields.fullname = updateData.fullname;
    if (updateData.email !== undefined) updateFields.email = updateData.email;
    if (updateData.dob !== undefined) updateFields.dob = updateData.dob;
    if (updateData.phone_number !== undefined) updateFields.phone_number = updateData.phone_number;
    if (updateData.gender !== undefined) updateFields.gender = updateData.gender;
    if (updateData.date_attended !== undefined) updateFields.date_attended = updateData.date_attended;
    if (updateData.status !== undefined) updateFields.status = updateData.status;

    // Xử lý roleType - tìm role dựa trên role_id
    if (updateData.roleType !== undefined) {
      const roleRepository = AppDataSource.getRepository(Role);
      const role = await roleRepository.findOne({
        where: { role_id: updateData.roleType }
      });
      
      if (!role) {
        throw new AppError(
          `Role with type ${updateData.roleType} not found`,
          HttpStatusCode.BAD_REQUEST,
          'ROLE_NOT_FOUND'
        );
      }
      
      // Update relation - set role object
      updateFields.role = role;
    }

    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(updateFields)
      .where('username = :username', { username })
      .execute();

    // 5. Return updated user detail
    return this.getDetailUser(username);
  }

}

export default new UserService();
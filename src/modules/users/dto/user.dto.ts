
// Input DTO (from req.body)
import {UserRole} from "@/modules/roles/entities/role.entity"
import {UserStatus, Zone} from "@/modules/users/enums/user.enum"
export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  fullname: string;
  position: UserRole;
  status: UserStatus;
  DOB: Date;
  attended: Date;
  zone: Zone;
  phone_number: string;
}

// Output DTO (for response)
export interface UserResponseDto {
  username: string;
  fullname: string;
  createdAt?: Date;
  status: UserStatus;
  position: UserRole;
  attended: Date;
  DOB: Date;
  phone_number: string;
  zone: Zone;
}

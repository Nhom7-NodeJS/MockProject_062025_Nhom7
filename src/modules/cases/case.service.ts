import { Repository } from "typeorm";

import { AppDataSource } from "@/config/config-database";
import { AppError } from "@/common/error.response";
import { CaseStatus } from "./enums/case.enum";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { HttpStatusCode } from "@/constants/status-code";
import { IPaginationParams } from "@/utils/pagination";
import { User } from "@/modules/users/entities/user.entity";

import { Case} from "./entities/case.entity";

export class CaseService {
  private caseRepository: Repository<Case>;
  private caseUserRepository: Repository<CaseUser>;

  constructor() {
    this.caseRepository = AppDataSource.getRepository(Case);
    this.caseUserRepository = AppDataSource.getRepository(CaseUser);
  }

  private getBaseQuery() {
    return this.caseRepository
      .createQueryBuilder('case')
      .where('case.is_deleted = :isDeleted', { isDeleted: false })
      .orderBy('case.create_at', 'DESC');
  }

  async getAllCases(status?: CaseStatus): Promise<Case[]> {
    const query = this.getBaseQuery();
    
    if (status) {
      query.andWhere('case.status = :status', { status });
    }
    
    return query.getMany();
  }

  async getPaginatedCases(
    paginationParams: IPaginationParams,
    status?: CaseStatus
  ): Promise<{ items: Case[]; total: number }> {
    const { skip, limit } = paginationParams;
    
    const query = this.getBaseQuery();
    
    if (status) {
      query.andWhere('case.status = :status', { status });
    }
    
    // Get total count and paginated data in parallel
    const [items, total] = await Promise.all([
      query.skip(skip).take(limit).getMany(),
      query.getCount()
    ]);
    
    return { items, total };
  }

  async confirmCaseAndAssignInvestigators(
    caseId: string, 
    investigators: string[],
    notes: string | null = null
  ): Promise<{ case: Case; caseUsers: CaseUser[] }> {
    // 1. Get the case with related data using QueryBuilder
    const caseRecord = await this.getBaseQuery()
      .andWhere('case.case_id = :caseId', { caseId })
      .leftJoinAndSelect('case.caseUsers', 'caseUsers')
      .leftJoinAndSelect('caseUsers.user', 'user')
      .getOne();

    if (!caseRecord) {
      throw new AppError(
        `Case with ID ${caseId} not found`,
        HttpStatusCode.NOT_FOUND,
        'CASE_NOT_FOUND'
      );
    }

    // 2. Check if case is already confirmed
    if (caseRecord.status !== CaseStatus.PENDING_APPROVAL) {
      throw new AppError(
        `Case with ID ${caseId} is not in pending approval status`,
        HttpStatusCode.BAD_REQUEST,
        'INVALID_CASE_STATUS'
      );
    }

    // 3. Get all investigators in one query
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository
      .createQueryBuilder('user')
      .where('user.username IN (:...usernames)', { usernames: investigators })
      .andWhere('user.is_deleted = :isDeleted', { isDeleted: false })
      .getMany();

    // Check if all investigators were found
    if (users.length !== investigators.length) {
      const foundUsernames = new Set(users.map(u => u.username));
      const missing = investigators.filter(username => !foundUsernames.has(username));
      throw new AppError(
        `The following investigators were not found: ${missing.join(', ')}`,
        HttpStatusCode.NOT_FOUND,
        'INVESTIGATORS_NOT_FOUND',
        { missingInvestigators: missing }
      );
    }

    // 4. No need to check for existing assignments as users can be assigned to multiple cases
    // Remove any existing soft-deleted assignments for these users to this case
    await this.caseUserRepository
      .createQueryBuilder()
      .update(CaseUser)
      .set({ is_deleted: false })
      .where('case_id = :caseId', { caseId })
      .andWhere('username IN (:...usernames)', { usernames: investigators })
      .andWhere('is_deleted = :isDeleted', { isDeleted: true })
      .execute();

    // 5. Update case status to IN_PROCESS
    caseRecord.status = CaseStatus.IN_PROCESS;
    await this.caseRepository.save(caseRecord);

    // 6. Create case-user relationships for all investigators
    const caseUsers = investigators.map(username => {
      const caseUser = new CaseUser();
      caseUser.case_id = caseId;
      caseUser.username = username;
      if (notes) {
        caseUser.notes = notes;
      }
      caseUser.assigned_at = new Date();
      return caseUser;
    });

    // Save all case users in a single query
    const savedCaseUsers = await this.caseUserRepository.save(caseUsers);
    
    return { case: caseRecord, caseUsers: savedCaseUsers };
  }
}

export default new CaseService();

import { Case} from "./entities/case.entity";
import { AppDataSource } from "@/config/database.config";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { User } from "@/modules/users/entities/user.entity";

import { CaseStatus } from "./enums/case.enum";

export class CaseService {
  private caseRepository = AppDataSource.getRepository(Case);

  private getBaseQuery() {
    return this.caseRepository
      .createQueryBuilder('case')
      .where('case.is_deleted = :isDeleted', { isDeleted: false })
      .orderBy('case.create_at', 'DESC');
  }

  async getAll(): Promise<Case[]> {
    return this.getBaseQuery().getMany();
  }

  async getAllByStatus(status: CaseStatus): Promise<Case[]> {
    return this.getBaseQuery()
      .andWhere('case.status = :status', { status })
      .getMany();
  }

  async confirmCaseAndAssignInvestigator(
    caseId: string, 
    username: string,
    notes: string | null = null
  ): Promise<{ case: Case; caseUser: CaseUser }> {
    // 1. Get the case with related data using QueryBuilder
    const caseRecord = await this.getBaseQuery()
      .andWhere('case.case_id = :caseId', { caseId })
      .leftJoinAndSelect('case.caseUsers', 'caseUsers')
      .leftJoinAndSelect('caseUsers.user', 'user')
      .getOne();

    if (!caseRecord) {
      throw new Error('Case not found');
    }

    // 2. Check if case is already confirmed
    if (caseRecord.status !== CaseStatus.PENDING_APPROVAL) {
      throw new Error('Case is not in pending approval status');
    }

    // 3. Get the investigator user by username using QueryBuilder
    const userRepository = AppDataSource.getRepository(User);
    const investigator = await userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .andWhere('user.is_deleted = :isDeleted', { isDeleted: false })
      .getOne();

    if (!investigator) {
      throw new Error('Investigator not found');
    }

    // 4. Check if the user is already assigned to this case using QueryBuilder
    const caseUserRepository = AppDataSource.getRepository(CaseUser);
    const existingAssignment = await caseUserRepository
      .createQueryBuilder('caseUser')
      .where('caseUser.case_id = :caseId', { caseId })
      .andWhere('caseUser.username = :username', { username: investigator.username })
      .andWhere('caseUser.is_deleted = :isDeleted', { isDeleted: false })
      .getOne();

    if (existingAssignment) {
      throw new Error('This investigator is already assigned to this case');
    }

    // 5. Update case status to IN_PROCESS
    caseRecord.status = CaseStatus.IN_PROCESS;
    await this.caseRepository.save(caseRecord);

    // 6. Create new case-user relationship
    const caseUser = new CaseUser();
    caseUser.case_id = caseId;
    caseUser.username = investigator.username;
    if (notes !== null) {
      caseUser.notes = notes;
    }
    caseUser.assigned_at = new Date();
    
    await caseUserRepository.save(caseUser);
    
    return { case: caseRecord, caseUser };
  }
}

export default new CaseService();

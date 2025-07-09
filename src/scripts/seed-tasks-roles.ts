import { v4 as uuidv4 } from "uuid";

import { AppDataSource } from "@/config/config-database";
import { Role } from "@/modules/roles/entities/role.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Case } from "@/modules/cases/entities/case.entity";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { Task } from "@/modules/tasks/entities/task.entity";
import { UserRole } from "@/modules/roles/enums/role.enum";
import { Gender, UserStatus } from "@/modules/users/enums/user.enum";
import { TaskStatus } from "@/modules/tasks/enums/task.enum";
import {
  CaseSeverity,
  CaseStatus,
  CaseType,
} from "@/modules/cases/enums/case.enum";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { CaseEvidence } from "@/modules/cases_evidences/entities/case_evidence.entity";
import { EvidenceType } from "@/modules/evidences/enums/evidence.enum";
import { FinancialInvest } from "@/modules/financial_invests/entities/financial_invest.entity";
import { ForensicInvest } from "@/modules/forensic_invests/entities/forensic_invest.entity";

async function seedTasksRoles() {
  try {
    await AppDataSource.initialize();

    const roleRepository = AppDataSource.getRepository(Role);
    const userRepository = AppDataSource.getRepository(User);
    const caseRepository = AppDataSource.getRepository(Case);
    const caseUserRepository = AppDataSource.getRepository(CaseUser);
    const caseEvidenceRepository = AppDataSource.getRepository(CaseEvidence);
    const taskRepository = AppDataSource.getRepository(Task);
    const evidenceRepository = AppDataSource.getRepository(Evidence);
    const financialInvestRepository =
      AppDataSource.getRepository(FinancialInvest);
    const forensicInvestRepository =
      AppDataSource.getRepository(ForensicInvest);

    // === Clear data ===
    await taskRepository.createQueryBuilder().delete().where("1 = 1").execute();

    await financialInvestRepository
      .createQueryBuilder()
      .delete()
      .where("1 = 1")
      .execute();

    await forensicInvestRepository
      .createQueryBuilder()
      .delete()
      .where("1 = 1")
      .execute();

    await caseUserRepository
      .createQueryBuilder()
      .delete()
      .where("1 = 1")
      .execute();

    await caseEvidenceRepository
      .createQueryBuilder()
      .delete()
      .where("1 = 1")
      .execute();

    await evidenceRepository
      .createQueryBuilder()
      .delete()
      .where("1 = 1")
      .execute();

    await caseRepository.createQueryBuilder().delete().where("1 = 1").execute();

    await userRepository.createQueryBuilder().delete().where("1 = 1").execute();

    await roleRepository.createQueryBuilder().delete().where("1 = 1").execute();

    console.log("Cleared existing data");

    // === Insert Role ===
    const role1 = new Role();
    role1.role_id = "FINANCIAL_INVESTIGATOR";
    role1.description = UserRole.FINANCIAL_INVESTIGATOR;
    await roleRepository.save(role1);

    const role2 = new Role();
    role2.role_id = "FORENSIC_OFFICER";
    role2.description = UserRole.FORENSIC_OFFICER;
    await roleRepository.save(role2);

    // === Insert User 1 ===
    const user1 = new User();
    user1.username = "john_doe";
    user1.password_hash = "hashed_password1";
    user1.fullname = "John Doe";
    user1.dob = new Date("1990-01-01");
    user1.date_attended = new Date();
    user1.status = UserStatus.ACTIVE;
    user1.create_at = new Date();
    user1.role = role1;
    user1.gender = Gender.MALE;
    await userRepository.save(user1);

    // === Insert User 2 ===
    const user2 = new User();
    user2.username = "jane_smith";
    user2.password_hash = "hashed_password2";
    user2.fullname = "Jane Smith";
    user2.dob = new Date("1992-05-15");
    user2.date_attended = new Date();
    user2.status = UserStatus.ACTIVE;
    user2.create_at = new Date();
    user2.role = role2;
    user2.gender = Gender.FEMALE;
    await userRepository.save(user2);

    // === Insert Case 1 ===
    const case1 = new Case();
    case1.case_id = "CASE001";
    case1.case_name = "Fraud Investigation";
    case1.type_case = CaseType.MURDER;
    case1.severity = CaseSeverity.MEDIUM;
    case1.status = CaseStatus.PENDING_APPROVAL;
    case1.create_at = new Date();
    await caseRepository.save(case1);

    // === Insert Case 2 ===
    const case2 = new Case();
    case2.case_id = "CASE002";
    case2.case_name = "Forensic DNA";
    case1.type_case = CaseType.ROBBERY;
    case1.severity = CaseSeverity.LOW;
    case1.status = CaseStatus.IN_PROCESS;
    case2.create_at = new Date();
    await caseRepository.save(case2);

    // === Insert Evidence 1 ===
    const evidence1 = new Evidence();
    evidence1.evidence_id = uuidv4();
    evidence1.description = "Fingerprint found on crime scene.";
    evidence1.collected_at = new Date();
    evidence1.current_location = "Evidence Room A";
    evidence1.attach_file = "fingerprint_photo.jpg";
    evidence1.status = "Collected";
    evidence1.evidence_type = EvidenceType.DOCUMENTARY_EVIDENCE;
    evidence1.case = case1;
    evidence1.user = user1;
    await evidenceRepository.save(evidence1);

    // === Insert Evidence 2 ===
    const evidence2 = new Evidence();
    evidence2.evidence_id = uuidv4();
    evidence2.description = "DNA sample from suspect.";
    evidence2.collected_at = new Date();
    evidence2.current_location = "Evidence Locker B";
    evidence2.attach_file = "dna_report.pdf";
    evidence2.status = "Analyzing";
    evidence2.evidence_type = EvidenceType.BIOLOGICAL_EVIDENCE;
    evidence2.case = case2;
    evidence2.user = user2;
    await evidenceRepository.save(evidence2);

    // === Insert CaseUser 1 ===
    const caseUser1 = new CaseUser();
    caseUser1.case_id = "CASE001";
    caseUser1.username = user1.username;
    caseUser1.assigned_at = new Date();
    await caseUserRepository.save(caseUser1);

    // === Insert CaseUser 2 ===
    const caseUser2 = new CaseUser();
    caseUser2.case_id = "CASE002";
    caseUser2.username = user2.username;
    caseUser2.assigned_at = new Date();
    await caseUserRepository.save(caseUser2);

    // === Insert CaseEvidence 1 ===
    const caseEvidence1 = new CaseEvidence();
    caseEvidence1.case_id = case1.case_id;
    caseEvidence1.evidence_id = evidence1.evidence_id;
    caseEvidence1.is_deleted = false;
    caseEvidence1.case = case1;
    caseEvidence1.evidence = evidence1;
    await caseEvidenceRepository.save(caseEvidence1);

    // === Insert CaseEvidence 2 ===
    const caseEvidence2 = new CaseEvidence();
    caseEvidence2.case_id = case2.case_id;
    caseEvidence2.evidence_id = evidence2.evidence_id;
    caseEvidence2.case = case2;
    caseEvidence2.evidence = evidence2;
    await caseEvidenceRepository.save(caseEvidence2);

    // === Insert FinancialInvest ===
    const financialInvest = new FinancialInvest();
    financialInvest.evidence_id = evidence1.evidence_id; // match Evidence 1
    financialInvest.summary = "Financial summary of fraud transactions.";
    financialInvest.is_deleted = false;
    await financialInvestRepository.save(financialInvest);

    // === Insert ForensicInvest ===
    const forensicInvest = new ForensicInvest();
    forensicInvest.evidence_id = evidence2.evidence_id; // match Evidence 2
    forensicInvest.lab_name = "National Forensic Lab";
    forensicInvest.report = "DNA matched with suspect profile.";
    forensicInvest.result_summary = "Positive DNA match with suspect.";
    forensicInvest.received_at = new Date();
    forensicInvest.is_deleted = false;
    await forensicInvestRepository.save(forensicInvest);

    // === Insert Task 1 ===
    const task1 = new Task();
    task1.task_id = uuidv4();
    task1.task_name = "Investigate fraud";
    task1.content = "Collect and analyze fraud evidence.";
    task1.status = TaskStatus.WAITING_EXECUTING;
    task1.start_date = new Date();
    task1.due_date = new Date();
    task1.case_id = caseUser1.case_id;
    task1.username = caseUser1.username;
    await taskRepository.save(task1);

    // === Insert Task 2 ===
    const task2 = new Task();
    task2.task_id = uuidv4();
    task2.task_name = "Collect forensic samples";
    task2.content = "Gather DNA evidence from crime scene.";
    task2.status = TaskStatus.WAITING_EXECUTING;
    task2.start_date = new Date();
    task2.due_date = new Date();
    task2.case_id = caseUser2.case_id;
    task2.username = caseUser2.username;
    await taskRepository.save(task2);

    console.log("Seed completed with 2 rows!");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
}

seedTasksRoles();

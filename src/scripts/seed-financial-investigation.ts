import { AppDataSource } from "@/config/config-database";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { FinancialInvest } from "@/modules/financial_invests/entities/financial_invest.entities";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { Case } from "@/modules/cases/entities/case.entity";
import { User } from "@/modules/users/entities/user.entity";
import { WarrantStatus } from "@/modules/financial_invests/enums/financial_invest.enum";
import { UserStatus } from "@/modules/users/enums/user.enum";
import { CaseType, CaseSeverity, CaseStatus } from "@/modules/cases/enums/case.enum";
import { v4 as uuidv4 } from "uuid";

async function seedFinancialData() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    const evidenceRepository = AppDataSource.getRepository(Evidence);
    const financialInvestRepository = AppDataSource.getRepository(FinancialInvest);
    const warrantRepository = AppDataSource.getRepository(Warrant);
    const caseRepository = AppDataSource.getRepository(Case);
    const userRepository = AppDataSource.getRepository(User);
    
    // Create test data for api update and confirm financial investigation task
    // 1. Create User

    // const user = new User();
    // user.username = "baocuong123";
    // user.password_hash = "123456";
    // user.fullname = "Bảo Cường";
    // user.dob = new Date("2003-09-06");
    // user.date_attended = new Date("2025-06-18");
    // user.status = UserStatus.ACTIVE;
    // user.create_at = new Date();
    // user.is_deleted = false;

    // await userRepository.save(user);

    // 2. Create Case

    // const case_ = new Case();
    // case_.case_id = uuidv4();
    // case_.case_name = "Financial Fraud Investigation";
    // case_.type_case = CaseType.ROBBERY; 
    // case_.severity = CaseSeverity.MEDIUM;
    // case_.status = CaseStatus.IN_PROCESS;
    // case_.summary = "Suspected embezzlement involving company funds";
    // case_.create_at = new Date();
    // case_.is_deleted = false;

    // await caseRepository.save(case_);

    // 3. Create Warrant

    // const warrant = new Warrant();
    // warrant.warrant_id = uuidv4();
    // warrant.warrant_name = "Inspect Corporate Financial Records";
    // warrant.attached_file= ["corporate_records.pdf"];
    // warrant.time_publish = new Date("2025-01-01");
    // warrant.deadline = new Date("2025-01-31");
    // warrant.status = WarrantStatus.WAITING_EXECUTING;
    // warrant.is_deleted = false;
    // warrant.police_response = "baocuong123";
    // warrant.case = case_;

    // await warrantRepository.save(warrant);

    // 4. Insert Evidence 1

    // const evidence1 = new Evidence();
    // evidence1.evidence_id = uuidv4();
    // evidence1.description = "Suspicious bank transactions";
    // evidence1.collected_at = new Date("2025-01-15");
    // evidence1.current_location = "Financial Records";
    // evidence1.attach_file = "bank_statement_1.pdf";
    // evidence1.status = "Under Review";
    // evidence1.is_deleted = false;
    // evidence1.case = case_;
    // evidence1.warrant = warrant;

    // await evidenceRepository.save(evidence1);

    // 5. Insert FinancialInvest for Evidence 1

    // const financialInvest1 = new FinancialInvest();
    // financialInvest1.evidence_id = evidence1.evidence_id;
    // financialInvest1.summary = "Multiple large transactions to offshore accounts";
    // financialInvest1.is_deleted = false;

    // await financialInvestRepository.save(financialInvest1);

    // 6. Insert Evidence 2

    // const evidence2 = new Evidence();
    // evidence2.evidence_id = uuidv4();
    // evidence2.description = "Company financial records";
    // evidence2.collected_at = new Date("2025-02-20");
    // evidence2.current_location = "Financial Records";
    // evidence2.attach_file = "company_records_2024.xlsx";
    // evidence2.status = "Analysis Complete";
    // evidence2.is_deleted = false;
    // evidence2.case = case_;
    // evidence2.warrant = warrant;

    // await evidenceRepository.save(evidence2);

    // 7. Insert FinancialInvest for Evidence 2

    // const financialInvest2 = new FinancialInvest();
    // financialInvest2.evidence_id = evidence2.evidence_id;
    // financialInvest2.summary = "Evidence of embezzlement found in expense reports";
    // financialInvest2.is_deleted = false;
    // await financialInvestRepository.save(financialInvest2);

    // console.log("Successfully inserted test financial & warrant data!");

    // === Query 1 ===
    const evidencesWithFinancialInvest = await evidenceRepository
      .createQueryBuilder("evidence")
      .leftJoinAndSelect("evidence.financialInvest", "financialInvest")
      .where("evidence.is_deleted = :isDeleted", { isDeleted: false })
      .orderBy("evidence.collected_at", "DESC")
      .getMany();
    console.log("\n=== Query 1: Evidence with FinancialInvest ===");
    console.log(JSON.stringify(evidencesWithFinancialInvest, null, 2));

    // === Query 2 ===
    const financialInvestigations = await financialInvestRepository.find({
      relations: ["evidence"],
      where: { is_deleted: false },
      order: { evidence: { collected_at: "DESC" } }
    });
    console.log("\n=== Query 2: FinancialInvest with Evidence ===");
    console.log(JSON.stringify(financialInvestigations, null, 2));

    // === Query 3 ===
    const evidenceWithFinancial = await evidenceRepository.find({
      relations: ["financialInvest"],
      where: { is_deleted: false },
      order: { collected_at: "DESC" }
    });
    console.log("\n=== Query 3: All Evidence with FinancialInvest ===");
    console.log(JSON.stringify(evidenceWithFinancial, null, 2));

    // === Query 4 ===
    const financialAnalysis = await AppDataSource.manager.query(`
      SELECT 
        e.evidence_id,
        e.description,
        e.status,
        e.collected_at,
        f.summary,
        LENGTH(f.summary) - LENGTH(REPLACE(f.summary, ' ', '')) + 1 as word_count,
        CASE 
          WHEN e.status = 'Analysis Complete' THEN 'Completed' 
          ELSE 'In Progress' 
        END as investigation_status
      FROM 
        evidences e
      INNER JOIN 
        financial_invests f ON e.evidence_id = f.evidence_id
      WHERE 
        e.is_deleted = false
      ORDER BY 
        e.collected_at DESC
    `);
    console.log("\n=== Query 4: Financial Analysis Report (Raw SQL) ===");
    console.log(JSON.stringify(financialAnalysis, null, 2));

  } catch (error) {
    console.error("Error during data seeding:", error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("Data Source has been closed!");
    }
  }
}

seedFinancialData().catch(console.error);

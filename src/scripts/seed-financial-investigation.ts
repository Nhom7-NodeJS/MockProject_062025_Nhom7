import { Case } from "@/modules/cases/entities/case.entity";
import { AppDataSource } from "@/config/database.config";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { FinancialInvest } from "@/modules/financial_invests/entities/financial_invest.entity";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { WarrantStatus } from "@/modules/warrants/enums/warrant.enum";
import { v4 as uuidv4 } from "uuid";
import { CaseType, CaseSeverity, CaseStatus } from "@/modules/cases/enums/case.enum";
async function seedFinancialData() {
  try {
    // Initialize the data source
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    // Get repositories
    const evidenceRepository = AppDataSource.getRepository(Evidence);
    const financialInvestRepository =
      AppDataSource.getRepository(FinancialInvest);
    const warrantRepository = AppDataSource.getRepository(Warrant);
    const caseRepository = AppDataSource.getRepository(Case);

    // Uncomment to insert test data
    // Insert Case 1
    const case1 = new Case();
    case1.case_id = uuidv4();
    case1.case_name = "Fraud Case";
    case1.type_case = CaseType.MURDER
    case1.severity = CaseSeverity.HIGH;
    case1.status = CaseStatus.IN_PROCESS;
    case1.create_at = new Date();
    await caseRepository.save(case1);

    const warrant1 = new Warrant();
    warrant1.warrant_id = uuidv4();
    warrant1.warrant_name = "Search Warrant";
    warrant1.time_publish = new Date();
    warrant1.case = case1;
    warrant1.deadline = new Date("2025-01-15");
    warrant1.status = WarrantStatus.COMPLETED;
    await warrantRepository.save(warrant1);

    // Insert Evidence for Case 1
    const evidence1 = new Evidence();
    evidence1.evidence_id = uuidv4();
    evidence1.description = "Suspicious bank transactions";
    evidence1.collected_at = new Date("2025-01-15");
    evidence1.current_location = "Financial Records";
    evidence1.attach_file = "bank_statement_1.pdf";
    evidence1.status = "Under Review";
    evidence1.case = case1;
    evidence1.warrant = warrant1;
    await evidenceRepository.save(evidence1);

    // Insert FinancialInvest for Evidence 1
    const financialInvest1 = new FinancialInvest();
    financialInvest1.evidence_id = evidence1.evidence_id;
    financialInvest1.summary =
      "Multiple large transactions to offshore accounts";
    await financialInvestRepository.save(financialInvest1);

    // Insert Case 2
    const case2 = new Case();
    case2.case_id = uuidv4();
    case2.case_name = "Cyber Fraud Case";
    case2.type_case = CaseType.CYBER_CRIME;
    case2.severity = CaseSeverity.MEDIUM;
    case2.status = CaseStatus.PENDING_APPROVAL;
    case2.create_at = new Date();
    await caseRepository.save(case2);

    // Insert Warrant for Case 2
    const warrant2 = new Warrant();
    warrant2.warrant_id = uuidv4();
    warrant2.warrant_name = "Digital Evidence Warrant";
    warrant2.time_publish = new Date("2025-02-01");
    warrant2.deadline = new Date("2025-02-28");
    warrant2.status = WarrantStatus.WAITING_EXECUTING;
    warrant2.case = case2;
    await warrantRepository.save(warrant2);

    // Insert Evidence for Case 2
    const evidence2 = new Evidence();
    evidence2.evidence_id = uuidv4();
    evidence2.description = "Email phishing attempts";
    evidence2.collected_at = new Date("2025-02-05");
    evidence2.current_location = "Digital Forensics Lab";
    evidence2.attach_file = "phishing_emails.zip";
    evidence2.status = "Analyzing";
    evidence2.case = case2;
    evidence2.warrant = warrant2;
    await evidenceRepository.save(evidence2);

    // Insert FinancialInvest for Evidence 2
    const financialInvest2 = new FinancialInvest();
    financialInvest2.evidence_id = evidence2.evidence_id;
    financialInvest2.summary =
      "Multiple unauthorized transactions traced to fake accounts.";
    await financialInvestRepository.save(financialInvest2);

    console.log("Successfully inserted test financial data!");

    // QUERY SAMPLE
    //   // Query 1: All evidence with their financial investigations (using QueryBuilder)
    //   const evidencesWithFinancialInvest = await evidenceRepository
    //     .createQueryBuilder("evidence")
    //     .leftJoinAndSelect("evidence.financialInvest", "financialInvest")
    //     .where("evidence.is_deleted = :isDeleted", { isDeleted: false })
    //     .orderBy("evidence.collected_at", "DESC")
    //     .getMany();

    //   console.log(
    //     "\n=== Query 1: All Evidence with Financial Investigations (using QueryBuilder) ==="
    //   );
    //   console.log(JSON.stringify(evidencesWithFinancialInvest, null, 2));

    //   // Query 2: All financial investigations with their evidence (using Repository methods)
    //   const financialInvestigations = await financialInvestRepository.find({
    //     relations: ["evidence"],
    //     where: { is_deleted: false },
    //     order: { evidence: { collected_at: "DESC" } },
    //   });

    //   console.log(
    //     "\n=== Query 2: All Financial Investigations with Evidence (using Repository) ==="
    //   );
    //   console.log(JSON.stringify(financialInvestigations, null, 2));

    //   // Query 3: Get evidence with financial investigations (using evidenceRepository)
    //   const evidenceWithFinancial = await evidenceRepository.find({
    //     relations: ["financialInvest"],
    //     where: {
    //       is_deleted: false,
    //     },
    //     order: { collected_at: "DESC" },
    //   });

    //   console.log("\n=== Query 3: Evidence with Financial Investigations ===");
    //   console.log(JSON.stringify(evidenceWithFinancial, null, 2));

    //   // Query 4: Using raw SQL query for complex financial analysis
    //   const financialAnalysis = await AppDataSource.manager.query(`
    //     SELECT
    //       e.evidence_id,
    //       e.description,
    //       e.status,
    //       e.collected_at,
    //       f.summary,
    //       LENGTH(f.summary) - LENGTH(REPLACE(f.summary, ' ', '')) + 1 as word_count,
    //       CASE
    //         WHEN e.status = 'Analysis Complete' THEN 'Completed'
    //         ELSE 'In Progress'
    //       END as investigation_status
    //     FROM
    //       evidences e
    //     INNER JOIN
    //       financial_invests f ON e.evidence_id = f.evidence_id
    //     WHERE
    //       e.is_deleted = false
    //     ORDER BY
    //       e.collected_at DESC
    //   `);

    //   console.log("\n=== Query 4: Financial Analysis Report (Raw SQL) ===");
    //   console.log(JSON.stringify(financialAnalysis, null, 2));

    // await financialInvestRepository
    //   .createQueryBuilder()
    //   .delete()
    //   .where("1 = 1")
    //   .execute();
    // console.log("Cleared existing cases data");

    // await evidenceRepository
    //   .createQueryBuilder()
    //   .delete()
    //   .where("1 = 1")
    //   .execute();
    // console.log("Cleared existing cases data");

    // await warrantRepository
    //   .createQueryBuilder()
    //   .delete()
    //   .where("1 = 1")
    //   .execute();
    // console.log("Cleared existing cases data");

    // await caseRepository.createQueryBuilder().delete().where("1 = 1").execute();
    // console.log("Cleared existing cases data");

    // End try block
  } catch (error) {
    console.error("Error during financial data seeding:", error);
  } finally {
    // Close the data source connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("Data Source has been closed!");
    }
  }
}

// Run the seed function
seedFinancialData().catch(console.error);

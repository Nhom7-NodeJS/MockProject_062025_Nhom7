import { AppDataSource } from "@/config/database.config";
import { FinancialInvest } from "@/modules/financial_invests/entities/financial_invest.entity";

export const seedFinancialInvests = async () => {
  try {
    const repo = AppDataSource.getRepository(FinancialInvest);

    // Clear existing data
    await repo.createQueryBuilder().delete().where("1=1").execute();
    console.log("Cleared existing financial invests");

    const financials = [
      repo.create({
        evidence_id: "EVID-002", // must match evidence in evidences seed
        summary: "Reviewed bank records, confirmed 3 suspicious transfers",
        attach_file: ["evidence-001.pdf"],
      }),
    ];

    await repo.save(financials);
    console.log(`Seeded ${financials.length} FinancialInvests`);
  } catch (error) {
    console.error("Error seeding financial invests:", error);
  }
};

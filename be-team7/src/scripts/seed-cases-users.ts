import { AppDataSource } from "@/config/database.config";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";

export const seedCaseUsers = async () => {
  try {
    const caseUserRepo = AppDataSource.getRepository(CaseUser);
   // await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    // Clear existing data
    await caseUserRepo.createQueryBuilder().delete().where("1=1").execute();
    console.log("Cleared existing CaseUsers");

    const caseUsers = [
      caseUserRepo.create({
        case_id: "CASE-001",
        username: "officer.jane",
        notes: "Lead investigator on robbery",
        assigned_at: new Date(),
      }),
      caseUserRepo.create({
        case_id: "CASE-002",
        username: "officer.jane",
        notes: "Assigned to homicide case",
        assigned_at: new Date(),
      }),
      caseUserRepo.create({
        case_id: "CASE-003",
        username: "officer.jane",
        notes: "Assigned to campus assault case",
        assigned_at: new Date(),
      }),
    ];

    await caseUserRepo.save(caseUsers);
    console.log(`Seeded ${caseUsers.length} CaseUsers`);
  } catch (err) {
    console.error("Error seeding CaseUsers:", err);
  }
};


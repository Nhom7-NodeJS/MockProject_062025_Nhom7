import { AppDataSource } from "@/config/database.config";
import seedUsersAndRoles from "./seed-users-roles";
import seedCases from "./seed-cases";
import { seedCaseUsers } from "./seed-cases-users";
import { seedEvidences } from "./seed-evidences";
import seedTasksRoles from "./seed-tasks-roles";
import { seedFinancialInvests } from "./seed-financial-invest";
import { seedHolidays } from "./seed-holiday";
import { seedWarrants } from "./seed-warrant";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { Case } from "@/modules/cases/entities/case.entity";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Task } from "@/modules/tasks/entities/task.entity";
import { Role } from "@/modules/roles/entities/role.entity";
import { User } from "@/modules/users/entities/user.entity";
import { CaseEvidence } from "@/modules/cases_evidences/entities/case_evidence.entity";

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Deleting all existing data...");

    await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 0");
    await AppDataSource.getRepository(Task).clear();
    await AppDataSource.getRepository(CaseEvidence).clear();
    await AppDataSource.getRepository(CaseUser).clear();
    await AppDataSource.getRepository(Evidence).clear();
    await AppDataSource.getRepository(Case).clear();
    await AppDataSource.getRepository(User).clear();
    await AppDataSource.getRepository(Role).clear();
    await AppDataSource.getRepository(Warrant).clear();
    await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("✅ All data cleared.");

    await seedUsersAndRoles();
    console.log("✅ Seeded users and roles");

    await seedCases();
    console.log("✅ Seeded cases");

    await seedCaseUsers();
    console.log("✅ Seeded case-users");

    await seedEvidences();
    console.log("✅ Seeded evidences");

    await seedTasksRoles();
    console.log("✅ Seeded tasks and roles");

    await seedFinancialInvests();
    console.log("✅ Seeded financial invests");

    await seedHolidays();
    console.log("✅ Seeded holidays");

    await seedWarrants();
    console.log("✅ Seeded warrants");

    console.log("✅ Seeding complete.");
  } catch (error) {
    console.error("❌ Seed lỗi:", error);
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
})();

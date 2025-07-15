import { AppDataSource } from "@/config/database.config";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { WarrantStatus } from "@/modules/warrants/enums/warrant.enum";

export const seedWarrants = async () => {
  try {
     if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const warrantRepo = AppDataSource.getRepository(Warrant);
  
    // Clear old data
    await warrantRepo.createQueryBuilder().delete().where("1=1").execute();
    console.log("Cleared existing warrants");

    const warrants = [
      warrantRepo.create({
        warrant_name: "Discover John House 7",
        police_response: "officer.jane", // ID của user đã tồn tại
        attached_file: [
          "https://res.cloudinary.com/dh42mlh8c/image/upload/v1752421115/warrant/g8fobmmsbj4qdlarygei.png",
        ],
        time_publish: new Date("2025-07-10T08:00:00.000Z"),
        is_deleted: false,
        status: WarrantStatus.WAITING_EXECUTING,
        case: { case_id: "CASE-001" }, // case đã tồn tại trong CSDL
      }),
    ];

    await warrantRepo.save(warrants);
    console.log(`Seeded ${warrants.length} Warrants`);
  } catch (error) {
    console.error("Error seeding warrants:", error);
  }
};
seedWarrants();

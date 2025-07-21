import { AppDataSource } from "@/config/database.config";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { EvidenceType } from "@/modules/evidences/enums/evidence.enum";

export const seedEvidences = async () => {
  try {
  //  await AppDataSource.initialize();
    const evidenceRepo = AppDataSource.getRepository(Evidence);

    // Clear old data
    await evidenceRepo.createQueryBuilder().delete().where("1=1").execute();
    console.log("Cleared existing evidences");

    const evidences = [
      evidenceRepo.create({
        evidence_id: "EVID-001",
        description: "CCTV footage from bank lobby",
        collected_at: new Date("2025-06-15T11:00:00Z"),
        current_location: "Forensics Lab A",
        status: "Analyzing",
        evidence_type: EvidenceType.DIGITAL_EVIDENCE,
        user: { username: "officer.jane" },
        case: { case_id: "CASE-001" },
      }),
      evidenceRepo.create({
        evidence_id: "EVID-002",
        description: "Bank transaction history",
        collected_at: new Date("2025-06-15T12:30:00Z"),
        current_location: "Finance Dept",
        status: "Ready for financial review",
        evidence_type: EvidenceType.DOCUMENTARY_EVIDENCE,
        user: { username: "officer.jane" }, // Assuming this user exists
        case: { case_id: "CASE-001" },
      }),
      evidenceRepo.create({
        evidence_id: "EVID-003",
        description: "Blood sample from crime scene",
        collected_at: new Date("2025-06-25T15:00:00Z"),
        current_location: "Lab B",
        status: "In process",
        
        evidence_type: EvidenceType.BIOLOGICAL_EVIDENCE,
        user: { username: "officer.jane" },
        case: { case_id: "CASE-002" },
      }),
    ];

    await evidenceRepo.save(evidences);
    console.log(`Seeded ${evidences.length} Evidences`);
  } catch (error) {
    console.error("Error seeding evidences:", error);
  }
};
//seedEvidences();

import { AppDataSource } from "@/config/database.config";
import { Report } from "@/modules/reports/entities/report.entity";
import { Case } from "@/modules/cases/entities/case.entity";
import { User } from "@/modules/users/entities/user.entity";
import { ReportStatus, SeverityLevel, CrimeType, IncidentRelationship } from "@/modules/reports/enums/report.enum";

async function seedReports() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const reportRepository = AppDataSource.getRepository(Report);
    const caseRepository = AppDataSource.getRepository(Case);
    const userRepository = AppDataSource.getRepository(User);

    await reportRepository.createQueryBuilder()
      .delete()
      .where('1 = 1')
      .execute();
    
    // Reset auto increment về 1
    await AppDataSource.query('ALTER TABLE reports AUTO_INCREMENT = 1');
    console.log('Cleared existing reports data and reset auto increment');

    const firstCase = await caseRepository.findOne({ where: {} });
    const firstUser = await userRepository.findOne({ where: {} });

    if (!firstCase || !firstUser) {
      console.log('Please run seed-cases and seed-users-roles first');
      return;
    }

    const testReports = [
      {
        crime_type: CrimeType.CRIMES_AGAINST_PROPERTY,
        severity: SeverityLevel.URGENT,
        incident_date: new Date('2025-06-15T10:00:00Z'),
        description: "Armed robbery at downtown bank",
        detail_address: "123 Main Street, Downtown",
        reported_at: new Date(),
        status: ReportStatus.PENDING,
        reporter_fullname: "John Witness",
        reporter_email: "john.witness@email.com",
        reporter_phone_number: "555-0123",
        reporter_address: "456 Oak Street",
        reporter_incident_relationship: IncidentRelationship.WITNESS,
        is_deleted: false,
        case: firstCase,
        user: firstUser
      },
      {
        crime_type: CrimeType.CYBER_CRIMES,
        severity: SeverityLevel.NOT_URGENT,
        incident_date: new Date('2025-06-20T15:30:00Z'),
        description: "Suspicious cyber activity reported",
        detail_address: "Online/Digital",
        reported_at: new Date(),
        status: ReportStatus.PENDING,
        reporter_fullname: "Jane Smith",
        reporter_email: "jane.smith@email.com",
        reporter_phone_number: "555-0456",
        reporter_address: "789 Pine Avenue",
        reporter_incident_relationship: IncidentRelationship.VICTIM,
        is_deleted: false,
        case: firstCase,
        user: firstUser
      },
      {
        crime_type: CrimeType.DRUG_RELATED_CRIMES,
        severity: SeverityLevel.URGENT,
        incident_date: new Date('2025-06-25T18:00:00Z'),
        description: "Drug dealing activities in park",
        detail_address: "Central Park, North Entrance",
        reported_at: new Date(),
        status: ReportStatus.APPROVED,
        reporter_fullname: "Anonymous Caller",
        reporter_email: "anonymous@police.gov",
        reporter_phone_number: "555-0789",
        reporter_address: "Unknown",
        reporter_incident_relationship: IncidentRelationship.WITNESS,
        is_deleted: false,
        case: firstCase,
        user: firstUser
      }
    ];

    const createdReports = await reportRepository.save(testReports);
    console.log(`Successfully created ${createdReports.length} reports`);
    console.log('Report IDs:', createdReports.map(r => r.report_id));

  } catch (error) {
    console.error('Error seeding reports:', error);
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
}

seedReports();

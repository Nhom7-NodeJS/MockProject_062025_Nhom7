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
      },
      {
        crime_type: CrimeType.CRIMES_AGAINST_PERSONS,
        severity: SeverityLevel.URGENT,
        incident_date: new Date('2025-06-20T14:30:00Z'),
        description: "Assault incident at park",
        detail_address: "Central Park, East Side",
        reported_at: new Date(),
        status: ReportStatus.PENDING,
        reporter_fullname: "Sarah Smith",
        reporter_email: "sarah.smith@email.com",
        reporter_phone_number: "555-0456",
        reporter_address: "789 Pine Street",
        reporter_incident_relationship: IncidentRelationship.VICTIM,
        is_deleted: false,
        case: firstCase,
        user: firstUser
      },
      {
        crime_type: CrimeType.CYBER_CRIMES,
        severity: SeverityLevel.NOT_URGENT,
        incident_date: new Date('2025-06-25T09:15:00Z'),
        description: "Identity theft via phishing email",
        detail_address: "Online - Email Platform",
        reported_at: new Date(),
        status: ReportStatus.PENDING,
        reporter_fullname: "Mike Johnson",
        reporter_email: "mike.johnson@email.com",
        reporter_phone_number: "555-0789",
        reporter_address: "321 Elm Street",
        reporter_incident_relationship: IncidentRelationship.VICTIM,
        is_deleted: false,
        case: firstCase,
        user: firstUser
      },
      {
        crime_type: CrimeType.CRIMES_AGAINST_PROPERTY,
        severity: SeverityLevel.NOT_URGENT,
        incident_date: new Date('2025-06-28T16:45:00Z'),
        description: "Car break-in at shopping mall",
        detail_address: "Downtown Mall Parking Lot",
        reported_at: new Date(),
        status: ReportStatus.PENDING,
        reporter_fullname: "Lisa Brown",
        reporter_email: "lisa.brown@email.com",
        reporter_phone_number: "555-0321",
        reporter_address: "654 Maple Avenue",
        reporter_incident_relationship: IncidentRelationship.VICTIM,
        is_deleted: false,
        case: firstCase,
        user: firstUser
      },
      {
        crime_type: CrimeType.CRIMES_AGAINST_PERSONS,
        severity: SeverityLevel.NOT_URGENT,
        incident_date: new Date('2025-07-01T11:20:00Z'),
        description: "Harassment at workplace",
        detail_address: "Office Building, 5th Floor",
        reported_at: new Date(),
        status: ReportStatus.PENDING,
        reporter_fullname: "David Wilson",
        reporter_email: "david.wilson@email.com",
        reporter_phone_number: "555-0987",
        reporter_address: "987 Oak Boulevard",
        reporter_incident_relationship: IncidentRelationship.VICTIM,
        is_deleted: false,
        case: firstCase,
        user: firstUser
      },
      {
        crime_type: CrimeType.CYBER_CRIMES,
        severity: SeverityLevel.URGENT,
        incident_date: new Date('2025-07-05T20:30:00Z'),
        description: "Online banking fraud",
        detail_address: "Online Banking Platform",
        reported_at: new Date(),
        status: ReportStatus.PENDING,
        reporter_fullname: "Emma Davis",
        reporter_email: "emma.davis@email.com",
        reporter_phone_number: "555-0654",
        reporter_address: "147 Cedar Lane",
        reporter_incident_relationship: IncidentRelationship.VICTIM,
        is_deleted: false,
        case: firstCase,
        user: firstUser
      },
      {
        crime_type: CrimeType.CRIMES_AGAINST_PROPERTY,
        severity: SeverityLevel.NOT_URGENT,
        incident_date: new Date('2025-07-08T13:10:00Z'),
        description: "Vandalism of public property",
        detail_address: "City Park - Fountain Area",
        reported_at: new Date(),
        status: ReportStatus.PENDING,
        reporter_fullname: "Robert Taylor",
        reporter_email: "robert.taylor@email.com",
        reporter_phone_number: "555-0159",
        reporter_address: "753 Birch Street",
        reporter_incident_relationship: IncidentRelationship.WITNESS,
        is_deleted: false,
        case: firstCase,
        user: firstUser
      }
    ];

    // Thay đổi logging để hiển thị số lượng reports được tạo
    const savedReports = await reportRepository.save(testReports);
    const reportIds = savedReports.map(report => report.report_id);
    
    console.log(`Successfully created ${savedReports.length} reports`);
    console.log('Report IDs:', reportIds);

  } catch (error) {
    console.error('Error seeding reports:', error);
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
}

seedReports();

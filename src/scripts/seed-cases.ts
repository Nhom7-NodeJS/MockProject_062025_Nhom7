import { AppDataSource } from "@/config/database.config";
import { Case } from "@/modules/cases/entities/case.entity";
import { CaseSeverity, CaseStatus, CaseType } from "@/modules/cases/enums/case.enum";

async function seedCases() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const caseRepository = AppDataSource.getRepository(Case);

    // Clear existing data
    await caseRepository.createQueryBuilder()
      .delete()
      .where('1 = 1')
      .execute();
    console.log('Cleared existing cases data');

    // Create 3 test cases
    const testCases = [
      {
        case_id: 'CASE-001',
        case_name: 'Bank Robbery - Downtown Branch',
        type_case: CaseType.ROBBERY,
        severity: CaseSeverity.HIGH,
        status: CaseStatus.IN_PROCESS,
        summary: 'Armed robbery at downtown bank branch with multiple suspects',
        create_at: new Date('2025-06-15T10:00:00Z')
      },
      {
        case_id: 'CASE-002',
        case_name: 'Homicide - Central Park',
        type_case: CaseType.MURDER,
        severity: CaseSeverity.CRITICAL,
        status: CaseStatus.PENDING_APPROVAL,
        summary: 'Suspected homicide in Central Park area',
        create_at: new Date('2025-06-25T14:30:00Z')
      },
      {
        case_id: 'CASE-003',
        case_name: 'Sexual Assault - Campus Area',
        type_case: CaseType.RAPE,
        severity: CaseSeverity.HIGH,
        status: CaseStatus.IN_PROCESS,
        summary: 'Reported sexual assault near university campus',
        create_at: new Date('2025-06-28T09:15:00Z')
      }
    ];

    // Save test cases
    const createdCases = await caseRepository.save(testCases);
    console.log(`Successfully created ${createdCases.length} cases`);

  } catch (error) {
    console.error('Error seeding cases:', error);
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
}

seedCases();
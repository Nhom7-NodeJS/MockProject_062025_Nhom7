"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_database_1 = require("@/config/config-database");
const evidence_entity_1 = require("@/modules/evidences/entities/evidence.entity");
const physical_invest_entity_1 = require("@/modules/physical_invests/entities/physical_invest.entity");
async function seedData() {
    try {
        // Initialize the data source
        await config_database_1.AppDataSource.initialize();
        console.log('Data Source has been initialized!');
        // Get repositories
        const evidenceRepository = config_database_1.AppDataSource.getRepository(evidence_entity_1.Evidence);
        const physicalInvestRepository = config_database_1.AppDataSource.getRepository(physical_invest_entity_1.PhysicalInvest);
        // // Insert Evidence 1
        // const evidence1 = new Evidence();
        // evidence1.evidence_id = uuidv4();
        // evidence1.description = 'Knife found at crime scene';
        // evidence1.collected_at = new Date();
        // evidence1.current_location = 'Evidence Room A';
        // evidence1.attach_file = 'knife_evidence.jpg';
        // evidence1.status = 'In Storage';
        // await evidenceRepository.save(evidence1);
        // // Insert PhysicalInvest for Evidence 1
        // const physicalInvest1 = new PhysicalInvest();
        // physicalInvest1.evidence_id = evidence1.evidence_id;
        // physicalInvest1.image_url = 'https://example.com/images/knife_analysis.jpg';
        // await physicalInvestRepository.save(physicalInvest1);
        // // Insert Evidence 2
        // const evidence2 = new Evidence();
        // evidence2.evidence_id = uuidv4();
        // evidence2.description = 'Blood sample from victim';
        // evidence2.collected_at = new Date();
        // evidence2.current_location = 'Forensic Lab B';
        // evidence2.attach_file = 'blood_sample_123.jpg';
        // evidence2.status = 'Under Analysis';
        // await evidenceRepository.save(evidence2);
        // // Insert PhysicalInvest for Evidence 2
        // const physicalInvest2 = new PhysicalInvest();
        // physicalInvest2.evidence_id = evidence2.evidence_id;
        // physicalInvest2.image_url = 'https://example.com/images/blood_analysis.jpg';
        // await physicalInvestRepository.save(physicalInvest2);
        // console.log('Successfully inserted test data!');
        // Query 1: All evidence with their physical investigations (using QueryBuilder)
        const evidencesWithPhysicalInvest = await evidenceRepository
            .createQueryBuilder('evidence')
            .leftJoinAndSelect('evidence.physicalInvest', 'physicalInvest')
            .where('evidence.is_deleted = :isDeleted', { isDeleted: false })
            .orderBy('evidence.collected_at', 'DESC')
            .getMany();
        console.log('\n=== Query 1: All Evidence with Physical Investigations (using QueryBuilder) ===');
        console.log(JSON.stringify(evidencesWithPhysicalInvest, null, 2));
        // Query 2: All physical investigations with their evidence (using Repository methods)
        const physicalInvestigations = await physicalInvestRepository.find({
            relations: ['evidence'],
            where: { is_deleted: false },
            order: { evidence: { collected_at: 'DESC' } }
        });
        console.log('\n=== Query 2: All Physical Investigations with Evidence (using Repository) ===');
        console.log(JSON.stringify(physicalInvestigations, null, 2));
        // Query 3: Get evidence with specific status and their physical investigations
        const evidenceByStatus = await evidenceRepository.find({
            relations: ['physicalInvest'],
            where: {
                is_deleted: false
            },
        });
        console.log('\n=== Query 3: Evidence with Status "Under Analysis" and their Physical Investigations ===');
        console.log(JSON.stringify(evidenceByStatus, null, 2));
        // Query 4: Using raw SQL query for more complex scenarios
        const rawData = await config_database_1.AppDataSource.manager.query(`
      SELECT 
        e.evidence_id,
        e.description,
        e.status,
        p.image_url,
        e.collected_at
      FROM 
        evidences e
      LEFT JOIN 
        physical_invests p ON e.evidence_id = p.evidence_id
      WHERE 
        e.is_deleted = false
      ORDER BY 
        e.collected_at DESC
    `);
        console.log('\n=== Query 4: Raw SQL Query Results ===');
        console.log(JSON.stringify(rawData, null, 2));
    }
    catch (error) {
        console.error('Error during data seeding:', error);
    }
    finally {
        // Close the data source connection
        if (config_database_1.AppDataSource.isInitialized) {
            await config_database_1.AppDataSource.destroy();
            console.log('Data Source has been closed!');
        }
    }
}
// Run the seed function
seedData().catch(console.error);

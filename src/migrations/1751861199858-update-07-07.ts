import { MigrationInterface, QueryRunner } from "typeorm";

export class Update07071751861199858 implements MigrationInterface {
    name = 'Update07071751861199858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`holidays\` (\`holiday_id\` varchar(255) NOT NULL, \`holiday_name\` varchar(255) NOT NULL, \`type_of_holiday\` enum ('federal_holiday', 'states_holiday') NOT NULL, \`date_of_holiday\` timestamp NOT NULL, \`note\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`holiday_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`type_report\``);
        await queryRunner.query(`ALTER TABLE \`cases_users\` ADD \`notes\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`cases_users\` ADD \`assigned_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`crime_type\` enum ('Crimes Against Persons', 'Crimes Against Property', 'White-Collar Crimes', 'Cyber Crimes', 'Drug-related Crimes', 'Public Order Crimes') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`reporter_incident_relationship\` enum ('Victim', 'Witness', 'Bystander') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warrants\` ADD \`deadline\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warrants\` ADD \`status\` enum ('Waiting executing', 'Executing', 'Completed') NOT NULL DEFAULT 'Waiting executing'`);
        await queryRunner.query(`ALTER TABLE \`evidences\` ADD \`evidence_type\` enum ('Physical Evidence', 'Biological Evidence', 'Trace Evidence', 'Documentary Evidence', 'Digital Evidence') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`description\` enum ('Patrol Officer', 'Censor', 'Investigator', 'Police Chief', 'Forensic Officer', 'Financial Investigator') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` enum ('active', 'inactive') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`severity\``);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`severity\` enum ('Minor', 'Moderate', 'Serious', 'Critical') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`status\` enum ('Approved', 'Pending', 'Rejected') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`severity\``);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`severity\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`evidences\` DROP COLUMN \`evidence_type\``);
        await queryRunner.query(`ALTER TABLE \`warrants\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`warrants\` DROP COLUMN \`deadline\``);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`reporter_incident_relationship\``);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`crime_type\``);
        await queryRunner.query(`ALTER TABLE \`cases_users\` DROP COLUMN \`assigned_at\``);
        await queryRunner.query(`ALTER TABLE \`cases_users\` DROP COLUMN \`notes\``);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`type_report\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`holidays\``);
    }

}

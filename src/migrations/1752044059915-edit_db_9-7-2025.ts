import { MigrationInterface, QueryRunner } from "typeorm";

export class EditDb9720251752044059915 implements MigrationInterface {
    name = 'EditDb9720251752044059915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`case_location\``);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`reporter_location\``);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`detail_address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`reporter_address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`witnesses\` CHANGE \`fullname\` \`fullname\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`witnesses\` CHANGE \`contact\` \`contact\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`witnesses\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'unknown') NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE \`witnesses\` CHANGE \`statement\` \`statement\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`victims\` CHANGE \`contact\` \`contact\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`victims\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'unknown') NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE \`victims\` CHANGE \`injuries\` \`injuries\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`victims\` CHANGE \`status\` \`status\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` CHANGE \`severity\` \`severity\` enum ('Urgent', 'Not urgent') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` CHANGE \`reporter_phone_number\` \`reporter_phone_number\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` CHANGE \`status\` \`status\` enum ('Approved', 'Pending', 'Rejected') NOT NULL DEFAULT 'Pending'`);
        await queryRunner.query(`ALTER TABLE \`reports\` CHANGE \`reporter_incident_relationship\` \`reporter_incident_relationship\` enum ('Victim', 'Witness', 'Suspect') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'unknown') NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`dob\` \`dob\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`identification\` \`identification\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`catch_time\` \`catch_time\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`status\` \`status\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`fingerprints_hash\` \`fingerprints_hash\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`health_status\` \`health_status\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`evidences\` CHANGE \`collected_at\` \`collected_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`evidences\` CHANGE \`current_location\` \`current_location\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`evidences\` CHANGE \`attach_file\` \`attach_file\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`evidences\` CHANGE \`status\` \`status\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evidences\` CHANGE \`status\` \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`evidences\` CHANGE \`attach_file\` \`attach_file\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`evidences\` CHANGE \`current_location\` \`current_location\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`evidences\` CHANGE \`collected_at\` \`collected_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`health_status\` \`health_status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`fingerprints_hash\` \`fingerprints_hash\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`status\` \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`catch_time\` \`catch_time\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`identification\` \`identification\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`dob\` \`dob\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suspects\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'unknown') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` CHANGE \`reporter_incident_relationship\` \`reporter_incident_relationship\` enum ('Victim', 'Witness', 'Bystander') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` CHANGE \`status\` \`status\` enum ('Approved', 'Pending', 'Rejected') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` CHANGE \`reporter_phone_number\` \`reporter_phone_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` CHANGE \`severity\` \`severity\` enum ('Minor', 'Moderate', 'Serious', 'Critical') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`victims\` CHANGE \`status\` \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`victims\` CHANGE \`injuries\` \`injuries\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`victims\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'unknown') NULL`);
        await queryRunner.query(`ALTER TABLE \`victims\` CHANGE \`contact\` \`contact\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`witnesses\` CHANGE \`statement\` \`statement\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`witnesses\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'unknown') NULL`);
        await queryRunner.query(`ALTER TABLE \`witnesses\` CHANGE \`contact\` \`contact\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`witnesses\` CHANGE \`fullname\` \`fullname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`reporter_address\``);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP COLUMN \`detail_address\``);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`reporter_location\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD \`case_location\` varchar(255) NOT NULL`);
    }

}

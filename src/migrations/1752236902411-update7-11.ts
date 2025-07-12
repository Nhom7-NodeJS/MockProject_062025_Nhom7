import { MigrationInterface, QueryRunner } from "typeorm";

export class Update7111752236902411 implements MigrationInterface {
    name = 'Update7111752236902411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reports\` CHANGE \`severity\` \`severity\` enum ('Urgent', 'Not Urgent') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reports\` CHANGE \`severity\` \`severity\` enum ('Urgent', 'Not urgent') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`description\` enum ('Patrol Officer', 'Censor', 'Investigator', 'Police Chief', 'Forensic Officer', 'Financial Investigator') NOT NULL`);
    }

}

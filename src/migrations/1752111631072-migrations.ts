import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1752111631072 implements MigrationInterface {
    name = 'Migrations1752111631072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`task_id\` varchar(255) NOT NULL, \`task_name\` varchar(255) NOT NULL, \`content\` text NULL, \`status\` enum ('Waiting executing', 'Executing', 'Completed') NOT NULL DEFAULT 'Waiting executing', \`start_date\` timestamp NOT NULL, \`due_date\` timestamp NULL, \`completed_at\` timestamp NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`case_id\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, PRIMARY KEY (\`task_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cases_users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_d662c1112efff3322506ffac314\` FOREIGN KEY (\`case_id\`, \`username\`) REFERENCES \`cases_users\`(\`case_id\`,\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_d662c1112efff3322506ffac314\``);
        await queryRunner.query(`ALTER TABLE \`cases_users\` ADD \`role\` enum ('Main Investigator', 'Supporting Investigator') NOT NULL`);
        await queryRunner.query(`DROP TABLE \`tasks\``);
    }

}

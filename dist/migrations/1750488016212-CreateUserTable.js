"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1750488016212 = void 0;
class CreateUserTable1750488016212 {
    name = 'CreateUserTable1750488016212';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}
exports.CreateUserTable1750488016212 = CreateUserTable1750488016212;

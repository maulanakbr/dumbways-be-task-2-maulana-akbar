import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigrate1695719890010 implements MigrationInterface {
  name = 'TestMigrate1695719890010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`candidate_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`vision\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d35dc1b0486a0e51f59e2afe2f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_d35dc1b0486a0e51f59e2afe2f\` ON \`candidate_entity\``,
    );
    await queryRunner.query(`DROP TABLE \`candidate_entity\``);
  }
}

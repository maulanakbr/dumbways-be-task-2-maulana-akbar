import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigrate1696424653208 implements MigrationInterface {
  name = 'TestMigrate1696424653208';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`votes\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`candidateIdId\` varchar(36) NULL, UNIQUE INDEX \`IDX_19eea1c501dbd50b92f57aedc6\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`candidates\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`vision\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_11f2951d8383f3c871bd773aa6\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`votes\` ADD CONSTRAINT \`FK_b5c980e5225a18019b0108e73e2\` FOREIGN KEY (\`candidateIdId\`) REFERENCES \`candidates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`votes\` DROP FOREIGN KEY \`FK_b5c980e5225a18019b0108e73e2\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_11f2951d8383f3c871bd773aa6\` ON \`candidates\``,
    );
    await queryRunner.query(`DROP TABLE \`candidates\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_19eea1c501dbd50b92f57aedc6\` ON \`votes\``,
    );
    await queryRunner.query(`DROP TABLE \`votes\``);
  }
}

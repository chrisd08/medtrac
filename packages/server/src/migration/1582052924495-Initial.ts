import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1582052924495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" varchar NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" varchar NOT NULL, "userId" varchar)`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" varchar NOT NULL, "userId" varchar, CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_profile"("id", "name", "userId") SELECT "id", "name", "userId" FROM "profile"`
    );
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_profile" RENAME TO "profile"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "profile" RENAME TO "temporary_profile"`
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" varchar NOT NULL, "userId" varchar)`
    );
    await queryRunner.query(
      `INSERT INTO "profile"("id", "name", "userId") SELECT "id", "name", "userId" FROM "temporary_profile"`
    );
    await queryRunner.query(`DROP TABLE "temporary_profile"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

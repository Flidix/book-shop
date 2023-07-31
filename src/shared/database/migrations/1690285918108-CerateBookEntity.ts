import { MigrationInterface, QueryRunner } from "typeorm";

export class CerateBookEntity1690285918108 implements MigrationInterface {
    name = 'CerateBookEntity1690285918108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "avatar" character varying NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "price" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}

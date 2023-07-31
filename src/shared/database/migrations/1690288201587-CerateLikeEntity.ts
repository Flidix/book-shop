import { MigrationInterface, QueryRunner } from "typeorm";

export class CerateLikeEntity1690288201587 implements MigrationInterface {
    name = 'CerateLikeEntity1690288201587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fromUserId" integer, "toTrackId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_b6284f1d47e920e04db146cae91" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_944c4b9fd824ce381efe738c2eb" FOREIGN KEY ("toTrackId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_944c4b9fd824ce381efe738c2eb"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_b6284f1d47e920e04db146cae91"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}

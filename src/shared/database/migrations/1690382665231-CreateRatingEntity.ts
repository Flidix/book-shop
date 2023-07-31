import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRatingEntity1690382665231 implements MigrationInterface {
    name = 'CreateRatingEntity1690382665231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "stars" integer NOT NULL, "comment" character varying NOT NULL, "fromUserId" integer, "toBookId" integer, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books" ADD "stars" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_fd94d05641b3a6bdabf02aca740" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_6974e84859fa95af7f392a03c51" FOREIGN KEY ("toBookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_6974e84859fa95af7f392a03c51"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_fd94d05641b3a6bdabf02aca740"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "stars"`);
        await queryRunner.query(`DROP TABLE "ratings"`);
    }

}

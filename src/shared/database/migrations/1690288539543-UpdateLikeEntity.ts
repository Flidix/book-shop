import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLikeEntity1690288539543 implements MigrationInterface {
    name = 'UpdateLikeEntity1690288539543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_944c4b9fd824ce381efe738c2eb"`);
        await queryRunner.query(`ALTER TABLE "likes" RENAME COLUMN "toTrackId" TO "toBookId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_206ca6ba17577b4a508200960cf" FOREIGN KEY ("toBookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_206ca6ba17577b4a508200960cf"`);
        await queryRunner.query(`ALTER TABLE "likes" RENAME COLUMN "toBookId" TO "toTrackId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_944c4b9fd824ce381efe738c2eb" FOREIGN KEY ("toTrackId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

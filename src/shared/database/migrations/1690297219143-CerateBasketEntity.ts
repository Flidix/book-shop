import { MigrationInterface, QueryRunner } from "typeorm";

export class CerateBasketEntity1690297219143 implements MigrationInterface {
    name = 'CerateBasketEntity1690297219143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "baskets" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5ebda63f14b0171d7468bc32175" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "basketId" integer`);
        await queryRunner.query(`ALTER TABLE "books" ADD "basketId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_850d46e44914b9b7cca920fa443" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_1fd242ee20b4499c137b68c194a" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_1fd242ee20b4499c137b68c194a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_850d46e44914b9b7cca920fa443"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "basketId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "basketId"`);
        await queryRunner.query(`DROP TABLE "baskets"`);
    }

}

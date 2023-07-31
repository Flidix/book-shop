import { MigrationInterface, QueryRunner } from "typeorm";

export class CerateOrderEntity1690303805230 implements MigrationInterface {
    name = 'CerateOrderEntity1690303805230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_850d46e44914b9b7cca920fa443"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_1fd242ee20b4499c137b68c194a"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isPaid" boolean NOT NULL DEFAULT false, "price" integer NOT NULL DEFAULT '0', "userId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "basketId"`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_1fd242ee20b4499c137b68c194a" FOREIGN KEY ("basketId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_1fd242ee20b4499c137b68c194a"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "basketId" integer`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_1fd242ee20b4499c137b68c194a" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_850d46e44914b9b7cca920fa443" FOREIGN KEY ("basketId") REFERENCES "baskets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

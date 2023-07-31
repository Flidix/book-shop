import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1690280458403 implements MigrationInterface {
    name = 'UpdateUserEntity1690280458403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
    }

}

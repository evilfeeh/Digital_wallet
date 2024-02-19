import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1708098961947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4() , "fullname" varchar(100) NOT NULL, "CPF_CNPJ" varchar(14) NOT NULL, "email" varchar(50) NOT NULL, "hash" varchar(400) NOT NULL,  "commonUser" BOOLEAN DEFAULT true, "active" BOOLEAN DEFAULT true, "phone" varchar(50), "insertedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`)
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(), "user_id" uuid, "debit_amount" INT NOT NULL DEFAULT 0)`)
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "users"')
        await queryRunner.query('DROP TABLE "wallet"')
    }
}

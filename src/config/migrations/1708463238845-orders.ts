import { MigrationInterface, QueryRunner } from "typeorm"

export class Orders1708463238845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE orders (id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(), payer_email varchar(50) NOT NULL, seller_email varchar(50) NOT NULL, value INT NOT NULL, status varchar(50))')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE orders')
    }

}

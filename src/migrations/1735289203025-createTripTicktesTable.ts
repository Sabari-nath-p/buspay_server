import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTripTicktesTable1735289203025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trip_tickets',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'trip_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'ticket_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'fare',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['trip_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'trips',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['ticket_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tickets',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trip_tickets');
  }
}

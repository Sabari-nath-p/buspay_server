import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTicketsTable1734441434742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tickets',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'bus_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'boarding_stop_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'destination_stop_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'rate',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'coupon_code_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'device_id',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'payment_status',
            type: 'enum',
            enum: ['PENDING', 'PAID', 'FAILED'],
            default: "'PENDING'",
          },
          {
            name: 'is_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['bus_type_id'],
            referencedTableName: 'bus_types',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            columnNames: ['boarding_stop_id'],
            referencedTableName: 'stops',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            columnNames: ['destination_stop_id'],
            referencedTableName: 'stops',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            columnNames: ['coupon_code_id'],
            referencedTableName: 'coupons',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tickets');

    if (table) {
      const foreignKeys = table.foreignKeys.filter(
        (fk) =>
          fk.columnNames.includes('bus_type_id') ||
          fk.columnNames.includes('boarding_stop_id') ||
          fk.columnNames.includes('destination_stop_id') ||
          fk.columnNames.includes('coupon_code_id'),
      );

      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('tickets', fk);
      }
    }

    await queryRunner.dropTable('tickets');
  }
}

import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpdateTicketTable1735855998792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tickets');
    if (table) {
      const foreignKeys = table.foreignKeys.filter(
        (fk) =>
          fk.columnNames.includes('boarding_stop_id') ||
          fk.columnNames.includes('destination_stop_id'),
      );

      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('tickets', fk);
      }
    }
    await queryRunner.dropColumn('tickets', 'boarding_stop_id');
    await queryRunner.dropColumn('tickets', 'destination_stop_id');
    await queryRunner.addColumn(
      'tickets',
      new TableColumn({
        name: 'boarding_route_stop_id',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'tickets',
      new TableColumn({
        name: 'destination_route_stop_id',
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'tickets',
      new TableForeignKey({
        columnNames: ['boarding_route_stop_id'],
        referencedTableName: 'route_stops',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tickets',
      new TableForeignKey({
        columnNames: ['destination_route_stop_id'],
        referencedTableName: 'route_stops',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tickets');
    if (table) {
      const foreignKeys = table.foreignKeys.filter(
        (fk) =>
          fk.columnNames.includes('boarding_route_stop_id') ||
          fk.columnNames.includes('destination_route_stop_id'),
      );

      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('tickets', fk);
      }
    }
    await queryRunner.dropColumn('tickets', 'boarding_route_stop_id');
    await queryRunner.dropColumn('tickets', 'destination_route_stop_id');

    await queryRunner.addColumn(
      'tickets',
      new TableColumn({
        name: 'boarding_stop_id',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'tickets',
      new TableColumn({
        name: 'destination_stop_id',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'tickets',
      new TableForeignKey({
        columnNames: ['boarding_stop_id'],
        referencedTableName: 'stops',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tickets',
      new TableForeignKey({
        columnNames: ['destination_stop_id'],
        referencedTableName: 'stops',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }
}

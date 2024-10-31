import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRouteBusTable1726893716650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'route_bus',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'route_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'bus_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'start_timing',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'days_of_week',
            type: 'json',
            isNullable: false,
            default: `'[]'`,
          },
          {
            name: 'finish_timing',
            type: 'time',
            isNullable: true,
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
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'route_bus',
      new TableForeignKey({
        columnNames: ['route_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'routes',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'route_bus',
      new TableForeignKey({
        columnNames: ['bus_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'buses',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('route_bus');
    const routeForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('route_id') !== -1,
    );
    const busForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('bus_id') !== -1,
    );
    await queryRunner.dropForeignKey('route_bus', routeForeignKey);
    await queryRunner.dropForeignKey('route_bus', busForeignKey);
    await queryRunner.dropTable('route_bus');
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRouteStopsTable1724784740329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'route_stops',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'stop_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'route_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'distance_from_start',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'time_from_start',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'is_starting_point',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_destination',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'route_stops',
      new TableForeignKey({
        columnNames: ['stop_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stops',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'route_stops',
      new TableForeignKey({
        columnNames: ['route_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'routes',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('route_stops');
    const stopForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('stop_id') !== -1,
    );
    const routeForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('route_id') !== -1,
    );
    await queryRunner.dropForeignKey('route_stops', stopForeignKey);
    await queryRunner.dropForeignKey('route_stops', routeForeignKey);
    await queryRunner.dropTable('route_stops');
  }
}

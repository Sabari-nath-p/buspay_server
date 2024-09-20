import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBusTypeStopTable1726843988192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bus_type_stops',
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
            name: 'stop_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'bus_type_stops',
      new TableForeignKey({
        columnNames: ['bus_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bus_types',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'bus_type_stops',
      new TableForeignKey({
        columnNames: ['stop_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stops',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('bus_type_stops');
    const busTypeForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('bus_type_id') !== -1,
    );
    const stopForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('stop_id') !== -1,
    );

    if (busTypeForeignKey) {
      await queryRunner.dropForeignKey('bus_type_stops', busTypeForeignKey);
    }

    if (stopForeignKey) {
      await queryRunner.dropForeignKey('bus_type_stops', stopForeignKey);
    }

    await queryRunner.dropTable('bus_type_stops');
  }
}
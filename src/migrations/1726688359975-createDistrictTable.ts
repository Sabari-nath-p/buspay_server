import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDistrictTable1726688359975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'districts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'state_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'buses',
      new TableForeignKey({
        columnNames: ['district_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'districts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'routes',
      new TableForeignKey({
        columnNames: ['district_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'districts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'stops',
      new TableForeignKey({
        columnNames: ['district_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'districts',
        onDelete: 'CASCADE',
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    const busTable = await queryRunner.getTable('buses');
    const stopTable = await queryRunner.getTable('stops');
    const routeTable = await queryRunner.getTable('routes');
    const foreignKey1 = busTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('district_id') !== -1,
    );
    const foreignKey2 = routeTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('district_id') !== -1,
    );
    const foreignKey3 = stopTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('district_id') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('buses', foreignKey1);
    }
    if (foreignKey2) {
      await queryRunner.dropForeignKey('buses', foreignKey2);
    }
    if (foreignKey3) {
      await queryRunner.dropForeignKey('buses', foreignKey3);
    }
    await queryRunner.dropTable('districts');
  }
}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBusUSerTable1726811934168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bus_conductors',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'bus_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'bus_conductors',
      new TableForeignKey({
        columnNames: ['bus_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'buses',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'bus_conductors',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('bus_conductors');
    const busForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('bus_id') !== -1,
    );
    const userForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );

    await queryRunner.dropForeignKey('bus_conductors', busForeignKey);
    await queryRunner.dropForeignKey('bus_conductors', userForeignKey);
    await queryRunner.dropTable('bus_conductors');
  }
}

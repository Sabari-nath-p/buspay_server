import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateBusPrefenceTable1726694506209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bus_preference',
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
            name: 'preference_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'bus_preference',
      new TableForeignKey({
        columnNames: ['bus_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'buses',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'bus_preference',
      new TableForeignKey({
        columnNames: ['preference_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'preference',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('bus_preference');
    const busForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('bus_id') !== -1,
    );
    const preferenceForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('preference_id') !== -1,
    );

    await queryRunner.dropForeignKey('bus_preference', busForeignKey);
    await queryRunner.dropForeignKey('bus_preference', preferenceForeignKey);
    await queryRunner.dropTable('bus_preference');
  }
}

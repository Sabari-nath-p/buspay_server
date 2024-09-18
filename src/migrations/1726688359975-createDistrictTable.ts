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
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('buses');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('district_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('buses', foreignKey);
    }
    await queryRunner.dropTable('districts');
  }
}

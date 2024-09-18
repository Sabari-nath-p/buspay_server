import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRouteTable1724783273751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'routes',
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
            name: 'bus_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'timings',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'total_distance',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'district',
            type: 'varchar',
            isNullable: false,
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
      'routes',
      new TableForeignKey({
        columnNames: ['bus_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'buses',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('routes');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('bus_id') !== -1,
    );
    await queryRunner.dropForeignKey('routes', foreignKey);
    await queryRunner.dropTable('routes');
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTripTable1733315730478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trips',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'bus_id', type: 'int', isNullable: false },
          { name: 'conductor_id', type: 'int', isNullable: false },
          { name: 'route_id', type: 'int', isNullable: false },
          { name: 'started_at', type: 'timestamp', isNullable: true },
          { name: 'ended_at', type: 'timestamp', isNullable: true },
          {
            name: 'status',
            type: 'enum',
            enum: ['STARTED', 'ONGOING', 'COMPLETED'],
            isNullable: false,
            default: `'STARTED'`,
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
          {
            columnNames: ['bus_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'buses',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['conductor_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['route_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'routes',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trips', true);
  }
}

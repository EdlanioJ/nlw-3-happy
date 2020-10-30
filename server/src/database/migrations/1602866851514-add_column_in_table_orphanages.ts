import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addColumnInTableOrphanage1602866851514
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orphanages',
      new TableColumn({
        name: 'user_id',
        type: 'integer',
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      'orphanages',
      new TableForeignKey({
        name: 'orphanages',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'user_id');
  }
}

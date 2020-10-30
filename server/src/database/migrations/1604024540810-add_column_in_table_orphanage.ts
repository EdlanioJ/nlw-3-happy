import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnInTableOrphanage1604024540810
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orphanages',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: ['public', 'draft'],
        enumName: 'status_type',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'status');
  }
}

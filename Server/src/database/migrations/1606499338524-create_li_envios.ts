import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLiEnvios1606499338524 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'li_envios',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'li_id',
          type: 'integer',
          unsigned: true,
          isUnique: true
        },
        {
          name: 'data_criacao',
          type: 'datetime'
        },
        {
          name: 'data_modificacao',
          type: 'datetime'
        },
        {
          name: 'forma_envio',
          type: 'varchar'
        },
        {
          name: 'objeto',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'prazo',
          type: 'integer'
        },
        {
          name: 'valor',
          type: 'double'
        },
        {
          name: 'pedido_id',
          type: 'integer',
          unsigned: true
        }
      ],
      foreignKeys: [
        {
          name: 'FK_EnvioPedido',
          columnNames: ['pedido_id'],
          referencedTableName: 'li_pedidos',
          referencedColumnNames: ['li_id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('li_envios')
  }

}

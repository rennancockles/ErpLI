import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLiItens1606499831831 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'li_itens',
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
          name: 'altura',
          type: 'double'
        },
        {
          name: 'disponibilidade',
          type: 'integer'
        },
        {
          name: 'largura',
          type: 'double'
        },
        {
          name: 'linha',
          type: 'integer'
        },
        {
          name: 'nome',
          type: 'varchar'
        },
        {
          name: 'peso',
          type: 'double'
        },
        {
          name: 'preco_cheio',
          type: 'double'
        },
        {
          name: 'preco_custo',
          type: 'double'
        },
        {
          name: 'preco_promocional',
          type: 'double'
        },
        {
          name: 'preco_subtotal',
          type: 'double'
        },
        {
          name: 'preco_venda',
          type: 'double'
        },
        {
          name: 'produto',
          type: 'integer'
        },
        {
          name: 'produto_pai',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'profundidade',
          type: 'double'
        },
        {
          name: 'quantidade',
          type: 'integer'
        },
        {
          name: 'sku',
          type: 'varchar'
        },
        {
          name: 'tipo',
          type: 'varchar'
        },
        {
          name: 'pedido_id',
          type: 'integer',
          unsigned: true
        }
      ],
      foreignKeys: [
        {
          name: 'FK_ItemPedido',
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
    await queryRunner.dropTable('li_itens')
  }

}

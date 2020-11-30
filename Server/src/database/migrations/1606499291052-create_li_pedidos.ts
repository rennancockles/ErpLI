import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLiPedidos1606499291052 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'li_pedidos',
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
          name: 'cliente_obs',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'cupom_desconto',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'data_criacao',
          type: 'datetime'
        },
        {
          name: 'data_expiracao',
          type: 'datetime'
        },
        {
          name: 'data_modificacao',
          type: 'datetime'
        },
        {
          name: 'id_anymarket',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'id_externo',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'peso_real',
          type: 'double'
        },
        {
          name: 'resource_uri',
          type: 'varchar'
        },
        {
          name: 'situacao',
          type: 'varchar'
        },
        {
          name: 'utm_campaign',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'valor_desconto',
          type: 'double'
        },
        {
          name: 'valor_envio',
          type: 'double'
        },
        {
          name: 'valor_subtotal',
          type: 'double'
        },
        {
          name: 'valor_total',
          type: 'double'
        },
        {
          name: 'cliente_id',
          type: 'integer',
          unsigned: true
        },
        {
          name: 'endereco_id',
          type: 'integer',
          unsigned: true
        },
        {
          name: 'store_id',
          type: 'integer',
          unsigned: true
        }
      ],
      foreignKeys: [
        {
          name: 'FK_PedidoCliente',
          columnNames: ['cliente_id'],
          referencedTableName: 'li_clientes',
          referencedColumnNames: ['li_id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          name: 'FK_PedidoEndereco',
          columnNames: ['endereco_id'],
          referencedTableName: 'li_enderecos',
          referencedColumnNames: ['li_id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          name: 'FK_PedidoStore',
          columnNames: ['store_id'],
          referencedTableName: 'stores',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('li_pedidos')
  }

}

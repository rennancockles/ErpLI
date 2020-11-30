import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLiPagamentos1606500067054 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: 'li_pagamentos',
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
                name: 'authorization_code',
                type: 'varchar',
                isNullable: true
            },
            {
                name: 'bandeira',
                type: 'varchar',
                isNullable: true
            },
            {
                name: 'banco',
                type: 'varchar',
                isNullable: true
            },
            {
                name: 'codigo_retorno_gateway',
                type: 'varchar',
                isNullable: true
            },
            {
                name: 'forma_pagamento',
                type: 'varchar'
            },
            {
                name: 'forma_pagamento_nome',
                type: 'varchar'
            },
            {
                name: 'identificador_id',
                type: 'varchar',
                isNullable: true
            },
            {
                name: 'mensagem_gateway',
                type: 'varchar',
                isNullable: true
            },
            {
                name: 'pagamento_tipo',
                type: 'varchar'
            },
            {
                name: 'numero_parcelas',
                type: 'integer'
            },
            {
                name: 'valor_parcela',
                type: 'double'
            },
            {
                name: 'transacao_id',
                type: 'varchar'
            },
            {
                name: 'valor',
                type: 'double'
            },
            {
                name: 'valor_pago',
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
              name: 'FK_PagamentoPedido',
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
        await queryRunner.dropTable('li_pagamentos')
    }

}

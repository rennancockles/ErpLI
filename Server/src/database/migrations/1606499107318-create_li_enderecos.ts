import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLiEnderecos1606499107318 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'li_enderecos',
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
          name: 'bairro',
          type: 'varchar'
        },
        {
          name: 'cep',
          type: 'varchar'
        },
        {
          name: 'cidade',
          type: 'varchar'
        },
        {
          name: 'cnpj',
          type: 'varchar'
        },
        {
          name: 'complemento',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'cpf',
          type: 'varchar'
        },
        {
          name: 'endereco',
          type: 'varchar'
        },
        {
          name: 'estado',
          type: 'varchar'
        },
        {
          name: 'ie',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'nome',
          type: 'varchar'
        },
        {
          name: 'numero',
          type: 'varchar'
        },
        {
          name: 'pais',
          type: 'varchar'
        },
        {
          name: 'razao_social',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'referencia',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'rg',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'tipo',
          type: 'varchar'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('li_enderecos')
  }

}

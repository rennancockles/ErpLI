import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLiClientes1606498341495 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'li_clientes',
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
          name: 'nome',
          type: 'varchar'
        },
        {
          name: 'cnpj',
          type: 'varchar'
        },
        {
          name: 'cpf',
          type: 'varchar'
        },
        {
          name: 'razao_social',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'data_nascimento',
          type: 'date',
          isNullable: true
        },
        {
          name: 'email',
          type: 'varchar'
        },
        {
          name: 'resource_uri',
          type: 'varchar'
        },
        {
          name: 'sexo',
          type: 'varchar'
        },
        {
          name: 'telefone_celular',
          type: 'varchar'
        },
        {
          name: 'telefone_principal',
          type: 'varchar'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('li_clientes')
  }

}

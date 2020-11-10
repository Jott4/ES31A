exports.up = function (knex) {
  return knex.schema.createTable("cliente", function (table) {
    table.string("id").primary(),
      table.string("nome").notNullable(),
      table.string("razao_social").notNullable(),
      table.string("endereco").notNullable(),
      table.string("cidade").notNullable(),
      table.string("uf", 2).notNullable(),
      table.string("telefone").notNullable(),
      table.string("nomeGerente").notNullable(),
      table.string("foneGerente").notNullable();
    table.decimal("faturamento").notNullable();
    table.enu("tipo", ["MEI", "ME", "EPP"]).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cliente");
};

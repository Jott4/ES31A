exports.up = function (knex) {
  return knex.schema.createTable("operations", function (table) {
    table.increments("id").primary(),
      table.decimal("taxa_contratada").notNullable(),
      table.decimal("valor_contratado").notNullable(),
      table.date("data_contrato").notNullable();
    table.date("data_expiracao").notNullable();
    table.string("cliente_id").notNullable();
    table.enu("tipo", ["cheque", "titulo"]).notNullable();

    table.foreign("cliente_id").references("id").inTable("cliente");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("operations");
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('transacoes').then(existe => {
        if (existe) return;

        return knex.schema.createTable('transacoes', table => {
            table.uuid('id').primary();
            table.string('descricao').notNullable();
            table.decimal('valor').notNullable();
            table.date('vencimento').notNullable().defaultTo(knex.fn.now());
            table.uuid('usuario_id').references('id').inTable('usuarios').notNullable();
            //table.timestamp(true,true),
            //table.timestamp('deleted_at').nullable()
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('transacoes')
};

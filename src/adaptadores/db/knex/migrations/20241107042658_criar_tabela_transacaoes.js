

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const existe = knex.schema.hasTable('transacoes')
    if (existe) return

    return knex.schema.createTable('transacoes', table =>{
        table.uuid('id').primary()
        table.string('descricao', 255).notNullable()
        table.decimal('valor').notNullable()
        table.date('vencimento').notNullable().defaultTo(knex.fn.now())
        table.uuid('usuario_id').references('usuarios.id').inTable('usuarios').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('transacoes')
};

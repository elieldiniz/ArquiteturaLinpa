exports.up = async function(knex) {
    const existe = await knex.schema.hasTable("usuarios");
    if (existe) return;
  
    return knex.schema.createTable("usuarios", table => {
      table.uuid("id").primary();
      table.string("nome", 255).notNullable();
      table.string("email", 255).unique().notNullable();
      table.string("senha", 255).notNullable();
    });
  };
  
exports.down = async function(knex) {
    return knex.schema.dropTableIfExists("usuarios");
  };
  
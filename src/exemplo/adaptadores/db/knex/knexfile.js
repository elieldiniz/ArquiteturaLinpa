const dotenv = require('dotenv')
dotenv.config({path:"../../../../.env_local"})

module.exports = {
    client: "pg",
    connection: "postgresql://postgres:minhasenha@localhost:5432/meu_banco",
    migrations: {
        tableName: "knex_migrations",
    },
    pool:{
        min: 2,
        max: 10,
    }

}
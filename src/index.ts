import dotenv from "dotenv"

import  express from "express";
import ColecaoUsuarioDB from "./adaptadores/db/knex/ColecaoUsuarioDB";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";
import LoginUsuario from "./core/usuario/LoginUsuario";
import LoginUsuarioController from "./controller/LoginUsuarioController";
import JwtAdapter from "./adaptadores/auth/JwtAdaptar";
import BcryptAdapter from "./adaptadores/auth/BcryptAdapter";
import RegistrarUsuarioController from "./controller/RegistarrUsuarioController";



dotenv.config()
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT ?? 3001
app.listen(PORT,()=>{
    console.log("Servidor rodando na porta 3001")
})

// ------------------------------- Rotas abertas
const provedorToken = new JwtAdapter(process.env.JWT_SECRET!)
const provedorCripto = new BcryptAdapter()
const colecaoUsuario = new ColecaoUsuarioDB()

const registrarUsuario = new RegistrarUsuario(colecaoUsuario, provedorCripto)
const loginUsuario = new LoginUsuario(
    colecaoUsuario,
    provedorCripto,
    provedorToken
)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

//---------------------- Rotas autencticadas


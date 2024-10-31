import dotenv from "dotenv"
import RegistrarUsuarioControler from "./controller/RegistarrUsuarioController"
import  express from "express";
import ColecaoUsuarioDB from "./adaptadores/db/knex/ColecaoUsuarioDB";
import CriptoReal from "./adaptadores/auth/BcryptAdapter";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";
import LoginUsuario from "./core/usuario/LoginUsuario";
import LoginUsuarioController from "./controller/LoginUsuarioController";
import JwtAdapter from "./adaptadores/auth/JwtAdaptar";



dotenv.config()
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT ?? 3001
app.listen(PORT,()=>{
    console.log("Servidor rodando na porta 3001")
})

// ------------------------------- Rotas abertas
const provedorToken = new JwtAdapter(process.env.SEGREDO!)
const colecaoUsuario = new ColecaoUsuarioDB()
const ProvedorCripto = new CriptoReal()


const registrarUsuario = new RegistrarUsuario(colecaoUsuario, ProvedorCripto)
const loginUsuario = new LoginUsuario(colecaoUsuario,ProvedorCripto,provedorToken)
new RegistrarUsuarioControler(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

//---------------------- Rotas autencticadas


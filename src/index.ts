import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import ColecaoUsuarioDB from "./adaptadores/db/ColecaoUsuarioDB";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";
import LoginUsuario from "./core/usuario/LoginUsuario";
import LoginUsuarioController from "./controller/LoginUsuarioController";
import JwtAdapter from "./adaptadores/auth/JwtAdaptar";
import BcryptAdapter from "./adaptadores/auth/BcryptAdapter";
import RegistrarUsuarioController from "./controller/RegistarrUsuarioController";
import SalvarTrasacao from './core/transacao/SalvarTrasacao';
import SalvarTrasacaoController from './controller/SalvarTrasacaoController';
import UsuarioMiddleware from './controller/UsuarioMiddleware';
import ColecaoTransacaoDb from './adaptadores/db/ColecaoTransacaoDb';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT ?? 3001
app.listen(PORT,()=>{
    console.log("Servidor rodando na porta 3001")
})

const SECRET = process.env.SEGREDO

console.log("SECRET")
// ------------------------------- Rotas abertas
const provedorToken = new JwtAdapter(SECRET!)
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
const usuarioMiddleware = UsuarioMiddleware(colecaoUsuario,provedorToken)


const colecaoTransacao = new ColecaoTransacaoDb()
const salvarTransacao = new SalvarTrasacao(colecaoTransacao)
new SalvarTrasacaoController(app, salvarTransacao,usuarioMiddleware)
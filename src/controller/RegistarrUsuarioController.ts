import { send } from "process";
import RegistrarUsuario from "../core/usuario/RegistrarUsuario";
import  {Express}   from "express";


export default class functionRegistarUsuarioController {
    constructor(private servidor: Express,
        private registrarUsuarioUseCase: RegistrarUsuario
    ){
        servidor.post('/registrar', async (req,res) =>{
            await RegistrarUsuario.executa(
                req.body.name,
                req.body.email,
                req.body.senha,
            )

            res.status(201).send()
        })
       }   
}
import { Express } from "express";
import RegistrarUsuario from "../core/usuario/RegistrarUsuario";
import LoginUsuario from "../core/usuario/LoginUsuario";

export default class LoginUsuarioController {
    constructor(
        private servidor: Express,
        private Login: LoginUsuario
    ) {
        this.setupRoutes();
    }

    private setupRoutes() {
        this.servidor.post('/login', async (req, res) => {
            try {
                const usuario = await this.Login.executar(
                  {
                    email: req.body.email,
                    senha: req.body.senha
                  }
                );
                res.status(200).json({
                    usuario: usuario.usuario,
                    token: usuario.token
                })

            } catch (error) {
                res.status(403).send({ error: "Usuario Não encontrado" })
            }
        })
    }
}

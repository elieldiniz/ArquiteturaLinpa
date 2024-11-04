import { Express } from "express";
import RegistrarUsuario from "../core/usuario/RegistrarUsuario";

export default class RegistrarUsuarioController {
    constructor(
        private servidor: Express,
        private registrarUsuarioUseCase: RegistrarUsuario
    ) {
        this.setupRoutes();
    }

    private setupRoutes() {
        this.servidor.post('/registrar', async (req, res) => {

            console.log(req.params)
            try {
                await this.registrarUsuarioUseCase.executar(
                    {
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha
                    }
                );
                res.status(201).send();
            } catch (error) {
                console.error("Erro ao registrar usuário:", error);
                res.status(500).send({ error: "Erro ao registrar usuário" });
            }
        });
    }
}

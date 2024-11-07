import { Express, Request, Response } from 'express'
import SalvarTrasacao from '../core/transacao/SalvarTrasacao'

export default class SalvarTrasacaoController {
    constructor(
        private servidor: Express,
        private casoDeUso: SalvarTrasacao,
        ...middlewares: any[]
    ) {
        const fn =  async (req: Request, res: Response) => {
            try {
                const resposta = await casoDeUso.executar()
                res.status(200).json(resposta)
            } catch (err: any) {
                res.status(403).send(err.message)
            }
        }

        servidor.post('/transacao',middlewares, fn)
    }
}
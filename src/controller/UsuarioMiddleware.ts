
import ColecaoUsuario from "../core/usuario/ColecaoUsuario";
import ProvedorToken from "../core/usuario/ProvedorToken";

import { Request, Response, NextFunction } from "express";
import Usuario from "../core/usuario/Usuario";


export default function UsuarioMiddleware(
    colecao: ColecaoUsuario,
    provedor: ProvedorToken
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.replace('Bearer', '').trim();
            
            if (!token) {
                console.log('Token não fornecido');
                res.status(403).send({ mensagem: 'Token não fornecido' });
                return;
            }

           

            let usuarioToken: Usuario;

       


            try {
                usuarioToken = provedor.validarToken(token) as Usuario;
            } catch (error) {
                console.log('Erro na validação do token:', error);
                res.status(403).send({ mensagem: 'Token inválido' });
                return;
            }

            const usuario = await colecao.bucarPorEmail(usuarioToken.email);

            if (!usuario) {
                console.log('Usuário não encontrado para o email:', usuarioToken.email);
                res.status(403).send({ mensagem: 'Token inválido' });
                return;
            }

            (req as any).usuario = usuario;
            
            next(); // Certifique-se de chamar next() para continuar a cadeia de middlewares
        } catch (error) {
            console.log('Erro interno no servidor:', error);
            res.status(500).send({ mensagem: 'Erro interno no servidor' });
        }
    };
}

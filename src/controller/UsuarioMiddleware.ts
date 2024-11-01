
import ColecaoUsuario from "../core/usuario/ColecaoUsuario";
import ProvedorToken from "../core/usuario/ProvedorToken";

import { Request, Response, NextFunction } from "express";
import Usuario from "../core/usuario/Usuario";


export default function UsuarioMiddleware(
colecao: ColecaoUsuario,
provedor: ProvedorToken
){
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.replace('bearer', '').trim();
    
            if (!token) {
                res.status(403).send({ mensagem: 'Token não fornecido' });
                return;
            }
    
            const usuarioToken = provedor.validarToken(token) as Usuario;
    
            const usuario = await colecao.bucarPorEmail(usuarioToken.email);
    
            if (!usuario) {
                res.status(403).send({ mensagem: 'Token inválido' });
                return;
            }
    
            (req as any).usuario = usuario;
    
            next(); // Certifique-se de chamar next() para continuar a cadeia de middlewares
        } catch {
            res.status(500).send({ mensagem: 'Erro interno no servidor'});
        }
    };
    
}
import ColecaoUsuario from "../../../app/usuario/ColecaoUsuario";
import Usuario from "../../../app/usuario/Usuario";
import conexao from "./conexao"

export default class ColecaoUsuarioDB implements ColecaoUsuario {
    async inserir(usuario: Usuario): Promise<void> {
        await conexao.table('usuarios').insert(usuario)
    }

    async bucarPorEmail(email: string): Promise<Usuario | null> {
        const usuario = await conexao.table('usuarios').where({ email }).first()
        return usuario?? null
    }
}
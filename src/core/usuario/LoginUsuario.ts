
import SenhaCripto from "./SenhaCripto"
import ColecaoUsuario from "./ColecaoUsuario"
import Usuario from "./Usuario"
export default class LoginUsuario{

    constructor(
        private colecao: ColecaoUsuario,
        private provedorSenha: SenhaCripto

    ){

    }

    async executar(email: string, senha: string): Promise<Usuario> {

        const usuarioExistente = await this.colecao.bucarPorEmail(email)

        if(!usuarioExistente) throw new Error('usuario inexistente')

        const mesmaSenha = this.provedorSenha.comparar(
            senha,
            usuarioExistente.senha!
        )

        if(!mesmaSenha) throw new Error('senha invalida')

        return {...usuarioExistente, senha: undefined}

        // Ao invés de retornar o usuario inteiro, podemos retornar apenas os dados necessarios
  
    }
}
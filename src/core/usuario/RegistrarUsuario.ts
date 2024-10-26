
import SenhaCripto from "./SenhaCripto"
import ColecaoUsuario from "./ColecaoUsuario"
import Usuario from "./Usuario"
import Id from "../shared/id"

export default class RegistrarUsuario{
    static executa(name: any, email: any, senha: any) {
        throw new Error("Method not implemented.")
    }

    constructor(
        private colecao: ColecaoUsuario,
        private InverterSenha: SenhaCripto

    ){

    }

    async executar(nome: string, email: string, senha: string): Promise<Usuario> {

        const senhaCripto = this.InverterSenha.cripito(senha)

        const usuarioExistente = await this.colecao.bucarPorEmail(email)

        if(usuarioExistente) throw new Error('usuario existente')
 
        const usuario: Usuario = {
            id: Id.gerar(),
            nome,
            email,
            senha: senhaCripto
        }

        this.colecao.inserir(usuario)

        return usuario
    }
}
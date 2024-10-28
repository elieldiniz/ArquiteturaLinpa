
import SenhaCripto from "./SenhaCripto"
import ColecaoUsuario from "./ColecaoUsuario"
import Usuario from "./Usuario"
import Id from "../shared/id"
import CasoDeUso from "../shared/CasoDeUso"

export type Entrada = {nome: string, email: string, senha: string}

export default class RegistrarUsuario implements CasoDeUso<Entrada,Usuario>{
    static executa(name: any, email: any, senha: any) {
        throw new Error("Method not implemented.")
    }

    constructor(
        private colecao: ColecaoUsuario,
        private InverterSenha: SenhaCripto

    ){

    }

    async executar(dto: Entrada): Promise<Usuario> {

        const senhaCripto = this.InverterSenha.cripito(dto.senha)

        const usuarioExistente = await this.colecao.bucarPorEmail(dto.email)

        if(usuarioExistente) throw new Error('usuario existente')
 
        const usuario: Usuario = {
            id: Id.gerar(),
            nome: dto.nome,
            email: dto.email,
            senha: senhaCripto
        }

        this.colecao.inserir(usuario)

        return usuario
    }
}
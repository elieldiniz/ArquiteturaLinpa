import Colecao from "../portas/Colecao"
import SenhaCripto from "../portas/SenhaCripto"
import Usuario from "./Usuario"

export default class RegistrarUsuario{

    constructor(
        private colecao: Colecao,
        private InverterSenha: SenhaCripto

    ){

    }

    executar(nome: string, email: string, senha: string): Usuario {

        const senhaCripto = this.InverterSenha.cripito(senha)
 
        const usuario: Usuario = {
            id: `${Math.random()}`,
            nome,
            email,
            senha: senhaCripto
        }

        this.colecao.inserir(usuario)

        return usuario
    }
}
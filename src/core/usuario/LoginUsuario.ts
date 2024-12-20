
import SenhaCripto from "./SenhaCripto"
import ColecaoUsuario from "./ColecaoUsuario"
import Usuario from "./Usuario"
import CasoDeUso from "../shared/CasoDeUso"
import ProvedorToken from "./ProvedorToken"


export type Entrada = {email: string, senha: string}
export type Saida = {usuario: Usuario, token: string}

// Implementar a interface SenhaCripto e ColecaoUsuario
export default class LoginUsuario implements CasoDeUso<Entrada, Saida>{

    constructor(
        private colecao: ColecaoUsuario,
        private provedorSenha: SenhaCripto,
        private ProvedorToken: ProvedorToken // Implementar a interface ProvedorToken e gerar um token JWT aqui no método executar

    ){

    }

    async executar(dto: Entrada): Promise<Saida> {

        const usuarioExistente = await this.colecao.bucarPorEmail(dto.email)


        if(!usuarioExistente) throw new Error('usuario inexistente')
        
      
            
        const mesmaSenha = await this.provedorSenha.comparar(
                dto.senha,
                usuarioExistente.senha!
        )

        if(!mesmaSenha) throw new Error('senha invalida')

            try {
                return {
                    usuario: { ...usuarioExistente, senha: undefined },
                    token: this.ProvedorToken.gerarToken({
                        id: usuarioExistente.id,
                        nome: usuarioExistente.nome,
                        email: usuarioExistente.email
                    })
                };
            } catch (error) {
                console.error("Erro ao gerar token:", error);
                throw new Error("Não foi possível realizar o login. Tente novamente mais tarde.");
            }
            

    
  
    }
}
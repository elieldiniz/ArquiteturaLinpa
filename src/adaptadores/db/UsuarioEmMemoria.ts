
import ColecaoUsuario from "../../core/usuario/ColecaoUsuario"
import Usuario from "../../core/usuario/Usuario"

export  default class UsuarioEmMemoria implements ColecaoUsuario{
    private  itens: Usuario[] = []
    
    async inserir(itens: Usuario): Promise<void>{
        this.itens.push(itens)
    }

    bucarPorEmail(email: string): Promise<Usuario | null> {
       const usuario = this.itens.find(
        (usuario) => usuario.email === email
       )

       return Promise.resolve(usuario ?? null)
    }
}
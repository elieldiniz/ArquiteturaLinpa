import Colecao from "../../app/portas/Colecao"

export  default class RepositorioEmMemoria implements Colecao{
    usuario: any[] = []

    inserir(usuario: any){
        this.usuario.push(usuario)
        return usuario
    }
}
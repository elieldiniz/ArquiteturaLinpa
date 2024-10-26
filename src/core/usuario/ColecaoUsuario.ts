
import Usuario from "./Usuario";

export default interface ColecaoUsuario {
    inserir(usuario: Usuario): Promise<void>
    bucarPorEmail(email: string): Promise<Usuario | null>
}
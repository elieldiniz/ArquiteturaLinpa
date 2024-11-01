export default interface SenhaCripto {
    criptografar(item: any): any
    comparar(senha: string , senhaCriptografada: string): any
}
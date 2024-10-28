import bcrypt from "bcrypt"
import SenhaCripto from "../../core/usuario/SenhaCripto";

export default class CriptoReal implements SenhaCripto {
    cripito(item: any) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(item, salt)
    }
    comparar(senha: string, senhaCriptografada: string) {
       return bcrypt.compare(senha, senhaCriptografada)
    }
  
}
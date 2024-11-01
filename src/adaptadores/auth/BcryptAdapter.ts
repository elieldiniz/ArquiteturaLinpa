import bcrypt from 'bcrypt'
import ProvedorCriptografia from '../../core/usuario/SenhaCripto';

export default class BcryptAdapter implements ProvedorCriptografia {
    criptografar(senha: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    async comparar(senha: string, senhaCriptografada: string): Promise<boolean> {
        return await bcrypt.compare(senha, senhaCriptografada);
    }
}
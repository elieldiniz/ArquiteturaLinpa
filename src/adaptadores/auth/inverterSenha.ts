import SenhaCripto from "../../core/usuario/SenhaCripto"

export  default class InverterSenha implements SenhaCripto{

  criptografar(senha: any){
        const senhaCripto = senha.split('').reverse().join('')
        return senhaCripto
    }


    comparar(senha: string, senhaCriptografada: string) {
      const senhaFornecida = this.criptografar(senha)
      return senhaFornecida === senhaCriptografada

    }


}
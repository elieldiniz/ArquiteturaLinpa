import SenhaCripto from "../../app/portas/SenhaCripto"

export  default class InverterSenha implements SenhaCripto{

    cripito(senha: any){
        const senhaCripto = senha.split('').reverse().join('')
        return senhaCripto
    }


    comparar(senha: string, senhaCriptografada: string) {
      const senhaFornecida = this.cripito(senha)
      return senhaFornecida === senhaCriptografada

    }


}
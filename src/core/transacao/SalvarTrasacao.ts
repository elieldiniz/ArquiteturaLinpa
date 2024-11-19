import CasoDeUso from "../shared/CasoDeUso";
import Id from "../shared/id";
import Usuario from "../usuario/Usuario";
import ColecaoTransacao from "./ColecaoTransacao";
import Transacao from "./Transacao";

export type Entrada = {transacao: Transacao, id: string, usuario: Usuario}

export default class SalvarTrasacao implements CasoDeUso<Entrada, void >{

    constructor(private readonly colecao: ColecaoTransacao){}

    async executar(dto: Entrada): Promise<void>{

    if(dto.transacao.idUsuario !== dto.usuario.id){
            throw new Error('Usuário não confere')
    }

    const transacao = {...dto.transacao, id: dto.id ?? Id.gerar(),idUsuario: dto.usuario.id }

    dto.id
        ? await this.colecao.atualizar(transacao)
        : await this.colecao.adicionar(transacao)
       
       
    }
}
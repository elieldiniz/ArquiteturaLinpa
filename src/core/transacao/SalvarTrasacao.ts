import CasoDeUso from "../shared/CasoDeUso";
import Transacao from "./Transacao";

export default class SalvarTrasacao implements CasoDeUso<void, Transacao>{
    async executar(dto: void): Promise<Transacao>{

        return {
            id: '123', 
            descricao: 'Saldo',
            valor: '100',
            vencimento: new Date(),
            idUsuario: '123'
        };
    }
}
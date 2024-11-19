import CasoDeUso from "../shared/CasoDeUso";
import Usuario from "../usuario/Usuario";
import ColecaoTransacao from "./ColecaoTransacao";
import Saldo, { SaldoDTO } from "./Saldo";
import Transacao from "./Transacao";

export type Entrada = { usuario: Usuario; ano: number; mes: number };
export type Saida = { transacoe: Transacao[]; saldo: SaldoDTO };

export default class ExtratoMensal implements CasoDeUso<Entrada, Saida> {
  constructor(private readonly colecao: ColecaoTransacao) {}

  async executar(dto: Entrada): Promise<Saida> {
    const transacoes = await this.colecao.buscarPorMes(dto.usuario.id, dto.ano, dto.mes);



    return {
      transacoe: transacoes, // Ajuste do nome da propriedade
      saldo: new Saldo(transacoes).dto, // Passar um array válido para o saldo
    };
  }
}

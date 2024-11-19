

import Transacao from "../../src/core/transacao/Transacao"

const TransacaoRef = {
        descricao: 'conta de luz',
        valor: -100,
        vencimento: new Date('2024-01-01'),
        idUsuario:'5dfafd23-c22b-4156-bb9e-5ea259eb1be6'
} as Transacao

export default {
    semId: TransacaoRef,
    list:[
        {...TransacaoRef, valor: 5000, descricao:'salario' },
        {...TransacaoRef, valor: -450, descricao:'Conta de luz' },
        {...TransacaoRef, valor: -100, descricao:'Conta de Agua' },
        {...TransacaoRef, valor: -250, descricao:'Conta de Telefone' },

    ],
  
}
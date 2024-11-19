import axios from 'axios'

import { getAuthorizationHeader } from '../util/auth'
import transacoes from '../data/transacoes';

const baseUrl = process.env.API_URL


test('Deve adicionar uma trasacao', async () => {
    try {
        const headers = await getAuthorizationHeader();

        console.log('Headers de autorização:', headers);

        const resp = await axios.post(
            `${baseUrl}/transacao`,
            transacoes.semId ,
            headers
        );

        console.log('Resposta de sucesso:', resp.data);
        expect(resp.status).toBe(200);
    } catch (e: any) {
            console.log('Erro não relacionado à resposta:', e.response.data);
        
    }
});

test('Deve alterar uma transação por id', async () => {
    try {
        const headers = await getAuthorizationHeader();

        console.log('Headers de autorização:', headers);

        const resp = await axios.post(
            `${baseUrl}/transacao/072b17e9-0fad-4bda-96d2-862fb64f8d41`,
            {...transacoes.semId, valor: -143.56} ,
            headers
        );

        console.log('Resposta de sucesso:', resp.status);
        
        expect(resp.status).toBe(200);
    } catch (e: any) {
            console.log('Erro não relacionado à resposta:', e.response.data);
        
    }
});
test('Deve alterar uma transacao por id', async () => {
    try {
        const headers = await getAuthorizationHeader()
        const resp = await axios.post(
            `${baseUrl}/transacao`,
            { ...transacoes.semId, valor: -173.58 },
            headers
        )
        expect(resp.status).toBe(200)
    } catch (e: any) {
        console.log(e.response.data)
        expect(e.response.status).toBe(400)
    }
})



test('Deve retornar o token de autenticação', async () => {
    const headers = await getAuthorizationHeader();
    expect(headers).toHaveProperty('headers.Authorization');
    console.log('Token de autenticação:', headers.headers.Authorization);
});
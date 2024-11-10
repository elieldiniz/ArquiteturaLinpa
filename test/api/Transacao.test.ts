import axios from 'axios'

import { getAuthorizationHeader } from '../util/auth'

const baseUrl = process.env.API_URL

test('Deve registrar um novo usuario se nao existir', async () => {
    try {
        const headers = await getAuthorizationHeader();

        console.log('Headers de autorização:', headers);

        const resp = await axios.post(
            `${baseUrl}/transacao`,
            {},
            headers
        );

        console.log('Resposta de sucesso:', resp.data);
        expect(resp.status).toBe(200);
    } catch (e: any) {
        if (e.response) {
            console.log('Dados do erro:', e.response.data);
            console.log('Status do erro:', e.response.status);
            console.log('Cabeçalhos do erro:', e.response.headers);
            expect(e.response.status).toBe(400);
        } else {
            console.log('Erro não relacionado à resposta:', e.message);
        }
    }
});

test('Deve retornar o token de autenticação', async () => {
    const headers = await getAuthorizationHeader();
    expect(headers).toHaveProperty('headers.Authorization');
    console.log('Token de autenticação:', headers.headers.Authorization);
});
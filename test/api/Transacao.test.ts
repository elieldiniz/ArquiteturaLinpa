import axios from 'axios'

import { getAuthorizationHeader } from '../util/auth'

const baseUrl = process.env.API_URL

test('Deve registrar um novo usuario se nao existir', async () => {
    try {
        const headers = await getAuthorizationHeader()
        console.log(headers)
        const resp = await axios.post(
            `${baseUrl}/transacao`,
        {},
            headers
        )

        console.log(resp.data)
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
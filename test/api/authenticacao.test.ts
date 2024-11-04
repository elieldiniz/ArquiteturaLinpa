import axios from "axios";
import Usuario from "../../src/core/usuario/Usuario"

const baseUrl = process.env.API_URL


const usuario: Partial<Usuario> = {
    nome: 'eliel',
    email: 'elieldini@gamil.com',
    senha: '123456',
}


test('Deve registrar um novo usuário se não existir', async () => {
    try {
        const resp = await axios.post(`${baseUrl}/registrar`, usuario)
        expect(resp.status).toBe(201)
    } catch (e: any) {
        expect(e.response.status).toBe(400)
        expect(e.response.data).toBe('Usuário já existe.')
    }
})

test('Deve logar com email e senha corretos', async () => {

    const resp = await axios.post(`${baseUrl}/login`, {
        email: usuario.email,
        senha: usuario.senha,
})
    expect(resp.status).toBe(200)
    expect(resp.data.usuario.nome).toBe('eliel')
    expect(resp.data.usuario.email).toBe(usuario.email)
    expect(resp.data).toHaveProperty('token')
})
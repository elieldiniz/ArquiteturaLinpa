import axios from "axios";
import Usuario from "../../src/core/usuario/Usuario"
import usuarios from '../data/usuario'

const baseUrl = process.env.API_URL


const usuario: Partial<Usuario> = {
    nome: 'eliel',
    email: 'elieldini@gamil.com',
    senha: '123456',
}


test('Deve registrar um novo usuário se não existir', async () => {
    try {
        const resp = await axios.post(`${baseUrl}/registrar`, {
            nome: usuarios.completo.nome,
            email: usuarios.completo.email,
            senha: usuarios.completo.senha
    })
        expect(resp.status).toBe(201)
    } catch (e: any) {
        expect(e.response.status).toBe(400)
        expect(e.response.data).toBe('Usuário já existe.')
    }
})

test.skip('Deve logar com email e senha corretos', async () => {

    const resp = await axios.post(`${baseUrl}/login`, {
        email: usuarios.completo.email,
        senha: usuarios.completo.senha,
})
    expect(resp.status).toBe(200)
    expect(resp.data.usuario.nome).toBe('eliel diniz')
    expect(resp.data.usuario.email).toBe('elieldiniz@gmail.com')
    expect(resp.data).toHaveProperty('token')
})
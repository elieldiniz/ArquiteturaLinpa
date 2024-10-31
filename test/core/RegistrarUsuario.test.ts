import ColecaoUsuario from '../../src/core/usuario/ColecaoUsuario'
import RegistrarUsuario from '../../src/core/usuario/RegistrarUsuario'
import ColecaoUsuarioDB from '../../src/adaptadores/db/knex/ColecaoUsuarioDB'
import UsuarioEmMemoria from '../../src/adaptadores/db/UsuarioEmMemoria'
import SenhaCripto from '../../src/core/usuario/SenhaCripto'
import InverterSenha from '../../src/adaptadores/auth/inverterSenha'
import CriptoReal from '../../src/adaptadores/auth/BcryptAdapter'

test('Deve registrar um usuário com senha invertida', async () => {
    const colecao: ColecaoUsuario = new UsuarioEmMemoria()
    const senhaCripto: SenhaCripto = new InverterSenha()
    const casoDeUso = new RegistrarUsuario(colecao, senhaCripto)

    const usuario = await casoDeUso.executar({ nome: 'João da Silva', email: 'joao@jstad.com', senha: '12345' })

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(usuario.email).toBe('joao@jstad.com')
    expect(usuario.senha).toBe('54321') // Senha deve estar invertida
})

test('Deve registrar um usuário com senha criptografada', async () => {
    const colecao: ColecaoUsuario = new UsuarioEmMemoria()
    const senhaCripto: SenhaCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, senhaCripto)

    const usuario = await casoDeUso.executar({ nome: 'João da Silva', email: 'joao@jstad.com', senha: '123456' })

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(usuario.email).toBe('joao@jstad.com')

    expect(await senhaCripto.comparar('123456', usuario.senha!)).toBeTruthy()
})

test('Deve lançar erro ao cadastrar um usuário já cadastrado', async () => {
    const colecao: ColecaoUsuario = new UsuarioEmMemoria()
    const senhaCripto: SenhaCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, senhaCripto)

    const dadosUsuario = { nome: "Eliel", email: "elieldini@gmail.com", senha: "123456" }

    await casoDeUso.executar(dadosUsuario)

    await expect(casoDeUso.executar(dadosUsuario)).rejects.toThrow('usuario existente')
})

test.skip('Deve registrar um usuário no banco de dados (não executa automaticamente)', async () => {
    const colecao = new ColecaoUsuarioDB()
    const senhaCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, senhaCripto)

    const usuario = await casoDeUso.executar({ nome: 'João da Silva', email: 'joao@jstad.com', senha: '123456' })

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('João da Silva')
    expect(usuario.email).toBe('joao@jstad.com')
    expect(await senhaCripto.comparar('123456', usuario.senha!)).toBeTruthy()
})

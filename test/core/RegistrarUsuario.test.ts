import ColecaoUsuario from '../../src/core/usuario/ColecaoUsuario'
import RegistrarUsuario from '../../src/core/usuario/RegistrarUsuario'
import ColecaoUsuarioDB from '../../src/adaptadores/db/knex/ColecaoUsuarioDB'
import UsuarioEmMemoria from '../../src/adaptadores/db/UsuarioEmMemoria'
import SenhaCripto from '../../src/core/usuario/SenhaCripto'
import InverterSenha from '../../src/adaptadores/auth/inverterSenha'
import CriptoReal from '../../src/adaptadores/auth/CriptoReal'

test('Deve registrar um usuario', async  ()=>{
    const colecao: ColecaoUsuario = new UsuarioEmMemoria()
    const senhaCripito1 : SenhaCripto = new InverterSenha()
    const casoDeUso = new RegistrarUsuario(colecao,senhaCripito1)

    
    const usuario = await  casoDeUso.executar('joao da silva', 'joao@jstad.com','12345')
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('joao da silva')
    expect(usuario.email).toBe('joao@jstad.com')
    expect(usuario.senha).toBe('54321')
})

test('Deve registrar um usuario com senha cripitografada',async ()=>{
    const colecao: ColecaoUsuario = new UsuarioEmMemoria()
    const senhaCripito1 : SenhaCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao,senhaCripito1)
    const usuario = await  casoDeUso.executar('joao da silva', 'joao@jstad.com','123456')

   
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('joao da silva')
    expect(usuario.email).toBe('joao@jstad.com')
    expect(senhaCripito1.comparar('123456', usuario.senha )).toBeTruthy()
})


test('Deve lansar erro ao cadastra usuario ja cadastrado',async ()=>{
    const colecao: ColecaoUsuario = new UsuarioEmMemoria()
    const senhaCripito1 : SenhaCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao,senhaCripito1)

    const nome = 'jao batista'
    const email = 'jao@batista.com'
    const senha =  '123456'
    await  casoDeUso.executar(nome,email,senha)

    const exec =  async () => await  casoDeUso.executar(nome,email,senha)
   
    await expect(exec).rejects.toThrow('usuario existente')
})


test.skip('Deve registrar um usuario no banco de dados // test nao executa automatico',async ()=>{
    const colecao = new ColecaoUsuarioDB()
    const senhaCripito1 = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao,senhaCripito1)
    const usuario =await casoDeUso.executar('joao da silva', 'joao@jstad.com','123456')

   
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('joao da silva')
    expect(usuario.email).toBe('joao@jstad.com')
    expect(senhaCripito1.comparar('123456', usuario.senha )).toBeTruthy()
})
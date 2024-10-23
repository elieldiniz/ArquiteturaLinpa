import Colecao from '../src/exemplo/app/portas/Colecao'
import RegistrarUsuario from '../src/exemplo/app/usuario/RegistrarUsuario'
import RepositorioEmMemoria from '../src/exemplo/adaptadores/db/repositorioEmMemoria'
import SenhaCripto from '../src/exemplo/app/portas/SenhaCripto'
import InverterSenha from '../src/exemplo/adaptadores/auth/inverterSenha'
import CriptoReal from '../src/exemplo/adaptadores/auth/CriptoReal'

test('Deve registrar um usuario', ()=>{
    const colecao: Colecao = new RepositorioEmMemoria()
    const senhaCripito1 : SenhaCripto = new InverterSenha()
    const casoDeUso = new RegistrarUsuario(colecao,senhaCripito1)

    
    const usuario = casoDeUso.executar('joao da silva', 'joao@jstad.com','12345')
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('joao da silva')
    expect(usuario.email).toBe('joao@jstad.com')
    expect(usuario.senha).toBe('54321')
})

test('Deve registrar um usuario com senha cripitografada', ()=>{
    const colecao: Colecao = new RepositorioEmMemoria()
    const senhaCripito1 : SenhaCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao,senhaCripito1)
    const usuario = casoDeUso.executar('joao da silva', 'joao@jstad.com','123456')

   
    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('joao da silva')
    expect(usuario.email).toBe('joao@jstad.com')
    expect(senhaCripito1.comparar('123456', usuario.senha )).toBeTruthy()
})
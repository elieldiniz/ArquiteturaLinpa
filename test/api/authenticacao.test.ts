import axios from "axios";
import Usuario from "../../src/core/usuario/Usuario"

const baseUrl = process.env.API_URL


test("Deve registrar Um novo usuario se não existir",async ()=>{
 

    const usuario: Partial<Usuario> = {
        nome: "eliel",
        email: "elieldini@gamil.com",
        senha: "123456"
    }

    const resp = await axios.post(`${baseUrl}/registrar`,usuario)

    expect(resp.status).toBe(201)

})

test("Deve logar com email e senha Corretos",async ()=>{
 

    const usuario: Partial<Usuario> = {
        email: "elieldini@gamil.com",
        senha: "123456"
    }

    const resp = await axios.post(`${baseUrl}/login`,usuario)
    expect(resp.status).toBe(200)
    expect(resp.data.nome).toBe("eliel")
    expect(resp.data.email).toBe("elieldini@gamil.com")

})
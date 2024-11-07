import axios from 'axios';
import usuarios from '../data/usuario'

const baseUrl =  process.env.API_URL

export async function getAuthorizationHeader() {

    const resp = await axios.post(`${baseUrl}/login`, {
        email: usuarios.completo.email,
        senha: usuarios.completo.senha,
})
    return {
            headers: {
                Authorization: `Bearer ${resp.data.token}`
            }
        };

}

import dotenv from "dotenv"
import RegistrarUsuarioControler from "./controller/RegistarrUsuarioController"
import  express   from "express";
import ColecaoUsuarioDB from "./adaptadores/db/knex/ColecaoUsuarioDB";
import CriptoReal from "./adaptadores/auth/CriptoReal";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";



dotenv.config()

const app = express();
const PORT = process.env.PORT 
const colecaoUsuario = new ColecaoUsuarioDB()
const ProvedorCripto = new CriptoReal()
const registrarUsuarioUseCase = new RegistrarUsuario(colecaoUsuario, ProvedorCripto)
new RegistrarUsuarioControler(app, registrarUsuarioUseCase)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.listen(PORT,()=>{
    console.log("Servidor rodando na porta 3001")
})
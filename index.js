import express from 'express';
import cors from 'cors';
import rotaCliente from './Rotas/rotaCliente.js';
import rotaTreino from './Rotas/rotaTreino.js';
import rotaLogin from './Rotas/rotaLogin.js'
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from "../Seguranca/Autenticacao.js";

const host='0.0.0.0';
const porta='3006';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6

}))

app.use('/login', rotaLogin)
app.use('/cliente',verificarAcesso,rotaCliente);
app.use('/treino',verificarAcesso,rotaTreino);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})

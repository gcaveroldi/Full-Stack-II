import express from 'express';
import cors from 'cors';
import rotaCliente from './Rotas/rotaCliente.js';
import rotaTreino from './Rotas/rotaTreino.js';

const host='0.0.0.0';
const porta='3006';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/cliente',rotaCliente);
app.use('/treino',rotaTreino);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})

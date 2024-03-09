import { Router } from "express";
import TreinoCtrl from "../Controle/treinoCtrl.js";

const treinCtrl = new TreinoCtrl();
const rotaTreino = new Router();

rotaTreino
.get('/', treinCtrl.consultar)
.get('/:termo', treinCtrl.consultar)
.post('/', treinCtrl.gravar)
.patch('/', treinCtrl.atualizar)
.put('/', treinCtrl.atualizar)
.delete('/', treinCtrl.excluir);

export default rotaTreino;
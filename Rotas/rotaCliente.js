import { Router } from "express";
import ClienteCtrl from "../Controle/clienteCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const clientCtrl = new ClienteCtrl();
const rotaCliente = new Router();

rotaCliente
.get('/',clientCtrl.consultar)
.get('/:termo', clientCtrl.consultar)
.post('/',clientCtrl.gravar)
.patch('/',clientCtrl.atualizar)
.put('/',clientCtrl.atualizar)
.delete('/',clientCtrl.excluir);

export default rotaCliente;
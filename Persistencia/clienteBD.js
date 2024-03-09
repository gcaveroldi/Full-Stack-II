import Cliente from "../Modelo/cliente.js";
import conectar from "./conexao.js";
//BD = Banco de dadoss
export default class ClienteBD{
    async gravar(cliente){
        if (cliente instanceof Cliente){
            const sql = "INSERT INTO cliente(cliente_nome, cliente_datanasc, cat_treino) VALUES (?, ?, ?)"; 
            const parametros = [cliente.nome, cliente.datanasc, cliente.cat_treino];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            cliente.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cliente){
        if (cliente instanceof Cliente){
            const sql = "UPDATE cliente SET cliente_nome = ?, cliente_datanasc = ?, cat_treino = ? WHERE cliente_codigo = ?"; 
            const parametros = [cliente.nome, cliente.datanasc, cliente.cat_treino, cliente.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const sql = "DELETE FROM cliente WHERE cliente_codigo = ?"; 
            const parametros = [cliente.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(termo))){
            //consultar pelo código da categoria
            sql='SELECT cliente_codigo, cliente_nome, cliente_datanasc, cat_tipotreino FROM cliente c JOIN treino t ON c.cat_treino = t.cat_treino WHERE cliente_codigo = ?';
            parametros = [termo];
        }
        else{
            //consultar pela descricao
            if (!termo){
                termo = '';
            }
            sql = "SELECT cliente_codigo, cliente_nome, cliente_datanasc, cat_tipotreino FROM cliente c JOIN treino t ON c.cat_treino = t.cat_treino WHERE cliente_nome LIKE ?";
            parametros = ['%'+termo+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaCliente = [];
        for (const registro of registros){
            const cliente = new Cliente(registro.cliente_codigo, registro.cliente_nome, registro.cliente_datanasc, registro.cat_tipotreino);
            listaCliente.push(cliente);
        }
        return listaCliente;
    }
}
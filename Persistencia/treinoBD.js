import Treino from "../Modelo/treino.js";
import conectar from "./conexao.js";
//BD = Banco de dados
export default class TreinoBD{
    async gravar(treino){
        if (treino instanceof Treino){
            const sql = "INSERT INTO treino(cat_tipotreino) VALUES(?)"; 
            const parametros = [treino.descricao];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            treino.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(treino){
        if (treino instanceof Treino){
            const sql = "UPDATE treino SET cat_tipotreino = ? WHERE cat_treino = ?"; 
            const parametros = [treino.descricao, treino.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(treino){
        if (treino instanceof Treino){
            const sql = "DELETE FROM treino WHERE cat_treino = ?"; 
            const parametros = [treino.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da categoria
            sql='SELECT * FROM treino WHERE cat_treino = ? ORDER BY cat_tipotreino';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM treino WHERE cat_tipotreino LIKE ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaTreino = [];
        for (const registro of registros){
            const treino = new Treino(registro.cat_treino,registro.cat_tipotreino);
            listaTreino.push(treino);
        }
        return listaTreino;
    }
}
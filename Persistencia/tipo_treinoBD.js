import Tipo_Treino from "../Modelo/tipo_treino.js";
import conectar from "./conexao.js";
//BD = Banco de dados
export default class Tipo_TreinoBD{
    async gravar(tipo_treino){
        if (tipo_treino instanceof Tipo_Treino){
            const sql = "INSERT INTO tipo_treino(nome, descricao) VALUES(?,?)"; 
            const parametros = [tipo_treino.nome, tipo_treino.descricao];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            tipo_treino.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(tipo_treino){
        if (tipo_treino instanceof Tipo_Treino){
            const sql = "UPDATE tipo_treino SET nome = ? WHERE tipo_treino = ?"; 
            const parametros = [tipo_treino.nome, tipo_treino.descricao];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(tipo_treino){
        if (tipo_treino instanceof Tipo_Treino){
            const sql = "DELETE FROM tipo_treino WHERE nome = ?"; 
            const parametros = [tipo_treino.codigo];
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
            sql='SELECT * FROM tipo_treino WHERE nome = ? ORDER BY tipo_treino';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM tipo_treino WHERE nome LIKE ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaTreino = [];
        for (const registro of registros){
            const tipo_treino = new Tipo_Treino(registro.nome,registro.descricao);
            listaTreino.pusch(tipo_treino);
        }
        return listaTreino;
    }
}
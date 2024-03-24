import conectar from "./conexao.js";
// Importe o modelo Treino
import Treino from "../Modelo/treino.js";

// BD = Banco de dados
export default class TreinoBD {
    async gravar(treino) {
        if (treino instanceof Treino) {
            const sql = "INSERT INTO treino(categoria) VALUES(?)";
            const parametros = [treino.descricao];
            const conexao = await conectar(); // Retorna uma conexão
            const retorno = await conexao.execute(sql, parametros); // Prepara a SQL e depois executa
            treino.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(treino) {
        if (treino instanceof Treino) {
            const sql = "UPDATE treino SET categoria = ? WHERE codigo = ?";
            const parametros = [treino.descricao, treino.codigo];
            const conexao = await conectar(); // Retorna uma conexão
            await conexao.execute(sql, parametros); // Prepara a SQL e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(treino) {
        if (treino instanceof Treino) {
            const sql = "DELETE FROM treino WHERE codigo = ?";
            const parametros = [treino.codigo];
            const conexao = await conectar(); // Retorna uma conexão
            await conexao.execute(sql, parametros); // Prepara a SQL e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        // É um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))) {
            // Consultar pelo código do treino
            sql = 'SELECT * FROM treino WHERE codigo = ? ORDER BY categoria';
            parametros = [parametroConsulta];
        } else {
            // Consultar pela descrição
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM treino WHERE categoria LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaTreino = [];
        for (const registro of registros) {
            const treino = new Treino(registro.codigo, registro.categoria);
            listaTreino.push(treino);
        }
        return listaTreino;
    }
}

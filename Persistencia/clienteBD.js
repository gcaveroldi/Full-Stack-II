import conectar from "./conexao.js";
// Importe o modelo Cliente
import Cliente from "../Modelo/cliente.js";

// BD = Banco de dados
export default class ClienteBD {
    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "INSERT INTO cliente(nome, sobrenome, cidade, cep, id_treino) VALUES (?, ?, ?, ?, ?)";
            const parametros = [cliente.nome, cliente.sobrenome, cliente.cidade, cliente.cep, cliente.id_treino];
            const conexao = await conectar(); // Retorna uma conexão
            const retorno = await conexao.execute(sql, parametros); // Prepara a SQL e depois executa
            cliente.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "UPDATE cliente SET nome = ?, sobrenome = ?, cidade = ?, cep = ?, id_treino = ? WHERE id = ?";
            const parametros = [cliente.nome, cliente.sobrenome, cliente.cidade, cliente.cep, cliente.id_treino, cliente.id];
            const conexao = await conectar(); // Retorna uma conexão
            await conexao.execute(sql, parametros); // Prepara a SQL e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "DELETE FROM cliente WHERE id = ?";
            const parametros = [cliente.id];
            const conexao = await conectar(); // Retorna uma conexão
            await conexao.execute(sql, parametros); // Prepara a SQL e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        let sql = '';
        let parametros = [];
        // É um número inteiro?
        if (!isNaN(parseInt(termo))) {
            // Consultar pelo ID do cliente
            sql = 'SELECT * FROM cliente WHERE id = ?';
            parametros = [termo];
        } else {
            // Consultar pelo nome do cliente
            if (!termo) {
                termo = '';
            }
            sql = "SELECT * FROM cliente WHERE nome LIKE ?";
            parametros = ['%' + termo + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaCliente = [];
        for (const registro of registros) {
            const cliente = new Cliente(registro.id, registro.nome, registro.sobrenome, registro.cidade, registro.cep, registro.id_treino);
            listaCliente.push(cliente);
        }
        return listaCliente;
    }
}

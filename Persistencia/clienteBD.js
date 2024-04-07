import conectar from "./conexao.js";
import Cliente from "../Modelo/cliente.js";

export default class ClienteBD {
    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "INSERT INTO cliente(nome, sobrenome, cidade, cep, id_treino) VALUES (?, ?, ?, ?, ?)";
            const parametros = [cliente.nome, cliente.sobrenome, cliente.cidade, cliente.cep, cliente.id_treino];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            cliente.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "UPDATE cliente SET nome = ?, sobrenome = ?, cidade = ?, cep = ?, id_treino = ? WHERE id = ?";
            const parametros = [cliente.nome, cliente.sobrenome, cliente.cidade, cliente.cep, cliente.id_treino, cliente.id];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "DELETE FROM cliente WHERE id = ?";
            const parametros = [cliente.id];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        let sql = '';
        let parametros = [];
        if (!isNaN(parseInt(termo))) {
            sql = 'SELECT * FROM cliente WHERE id = ?';
            parametros = [termo];
        } else {
            if (!termo) {
                termo = '';
            }
            sql = `
                SELECT c.*, t.* 
                FROM cliente c 
                LEFT JOIN cliente_treino ct ON c.id = ct.id_cliente 
                LEFT JOIN treino t ON ct.id_treino = t.codigo 
                WHERE c.nome LIKE ? OR t.categoria LIKE ?
            `;
            parametros = ['%' + termo + '%', '%' + termo + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaCliente = [];
        for (const registro of registros) {
            const cliente = new Cliente(registro.id, registro.nome, registro.sobrenome, registro.cidade, registro.cep, registro.id_treino);
            if (registro.codigo) {
                const treino = new Treino(registro.codigo, registro.categoria);
                cliente.treino = treino;
            }
            listaCliente.push(cliente);
        }
        return listaCliente;
    }
}

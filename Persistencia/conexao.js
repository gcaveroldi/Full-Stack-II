import mysql from 'mysql2/promise';

export default async function conectar() {
    try {
        if (global.poolConexoes) {
            return await global.poolConexoes.getConnection();
        } else {
            const pool = mysql.createPool({
                host: 'localhost',
                port: '3306',
                database: 'academia',
                waitForConnections: true,
                connectionLimit: 10,
                maxIdle: 10,
                idleTimeout: 60000,
                queueLimit: 0,
                enableKeepAlive: true,
                keepAliveInitialDelay: 0,
                connectTimeout: 10000, // Tempo limite de conexão em milissegundos (10 segundos)
            });

            global.poolConexoes = pool;
            return await pool.getConnection();
        }
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);
        throw error; // Lançar o erro para que seja tratado pela aplicação
    }
}

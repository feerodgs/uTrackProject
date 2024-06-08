import mysql from 'mysql2/promise';

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'masterkey',
    database: 'utrack'
};

export async function connectToDatabase () {
    try {
        const connection = await mysql.createConnection(connectionConfig);
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        return connection;
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
        throw error;
    }
};
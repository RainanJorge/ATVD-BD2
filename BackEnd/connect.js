import dotenv from 'dotenv';
import pg from 'pg'
dotenv.config();

const { Client } = pg;

const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB
});

async function conectar() {
    try {
        await client.connect();
        console.log('Conectado ao banco de dados.');
    }
    catch (err) {
        console.error('Erro ao conectar ao banco: ', err);
    }
}

conectar();

export default client;
import pkg from 'typescript';
const { resolveModuleName } = pkg;

import models from '../models/models.js';
import { connectToDatabase } from '../utils/database.js';

const Track = models.Track;

export const getTracks = async (codigoUsuario) => {
    const connection = await connectToDatabase();

    try {
        const query = `SELECT T.ID, T.NOME_PRODUTO, T.DATA_PREVISAO, T.CODIGO_RASTREIO, T.CODIGO_USUARIO FROM track T INNER JOIN usuario U ON T.CODIGO_USUARIO = U.ID WHERE U.EMAIL = '${codigoUsuario}';`;
        const [rows] = await connection.execute(query, [codigoUsuario]);
        await connection.end();
        return rows;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return { status: 'error', message: 'Erro ao buscar dados', details: error.message };
    }
};


export const getTrack = async (id) => {
    try {
        return await fetchTrack(id);
    } catch (error) {
        return { error: error.message };
    }
};

async function fetchTrack(id) {
    try {
        console.log(id);
        let response = await fetch(`https://www.cepcerto.com/ws/encomenda-json/${id}/45eae6254b24ec6f27ab9ded556b9b538223939f/`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Aguardar o processamento do corpo JSON
        console.log(data);

        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}

export const createTrack = async (params) => {
    const track = new Track(params);
    return sendTrackParams(track);
};

export const deleteTrack = async (id) => {
    const connection = await connectToDatabase();
    console.log("este é o ID: " + id);
    await connection.execute(`DELETE FROM track WHERE ID = ${id};`);
    await connection.end();
    return 'Track deletado'
}

const sendTrackParams = async (track) => {
    const { nomeProduto, dataPrevisao, codigoRastreio, codigoUsuario } = track;

    if (!nomeProduto || !dataPrevisao || !codigoRastreio || !codigoUsuario) {
        throw new Error('Um ou mais parâmetros estão indefinidos.');
    }

    const connection = await connectToDatabase();

    try {
        const query = `
            INSERT INTO track (nome_produto, data_previsao, codigo_rastreio, codigo_usuario)
            SELECT ?, ?, ?, U.id FROM usuario U WHERE U.email = ?
        `;
        await connection.execute(query, [nomeProduto, dataPrevisao, codigoRastreio, codigoUsuario]);

        const queryId = 'SELECT id FROM track ORDER BY id DESC LIMIT 1';
        const [rows] = await connection.execute(queryId);
        const id = rows[0]?.id;

        if (!id) {
            throw new Error('Erro ao obter o ID do novo registro.');
        }

        const result = {
            ID: id,
            NOME_PRODUTO: nomeProduto,
            DATA_PREVISAO: dataPrevisao,
            CODIGO_RASTREIO: codigoRastreio,
            CODIGO_USUARIO: codigoUsuario
        };

        console.log(result);
        return result;
    } catch (error) {
        console.error('Erro ao enviar os parâmetros de rastreamento:', error);
        throw error;
    } finally {
        await connection.end();
    }
};




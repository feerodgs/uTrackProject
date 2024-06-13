import pkg from 'typescript';
const { resolveModuleName } = pkg;

import models from '../models/models.js';
import { connectToDatabase } from '../utils/database.js';

const Track = models.Track;

export const getTracks = async (codigoUsuario) => {
    const connection = await connectToDatabase();

    try {
        const query = `SELECT NOME_PRODUTO, DATA_PREVISAO, CODIGO_RASTREIO, CODIGO_USUARIO FROM TRACK WHERE CODIGO_USUARIO = ?`;
        const [rows] = await connection.execute(query, [codigoUsuario]);
        await connection.end();

        const retorno = rows.map(row => ({
            NOME_PRODUTO: row.NOME_PRODUTO,
            DATA_PREVISAO: row.DATA_PREVISAO,
            CODIGO_RASTREIO: row.CODIGO_RASTREIO,
            CODIGO_USUARIO: row.CODIGO_USUARIO,
        }));

        return retorno;
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
        let response = await fetch(`https://www.cepcerto.com/ws/encomenda-json/${id}/45eae6254b24ec6f27ab9ded556b9b538223939f/`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
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
    await connection.execute(`DELETE FROM TRACK WHERE ID = ${id};`);
    await connection.end();
    return 'Track deletado'
}

const sendTrackParams = async (track) => {
    const connection = await connectToDatabase();
    const query = 'INSERT INTO TRACK (NOME_PRODUTO, DATA_PREVISAO, CODIGO_RASTREIO, CODIGO_USUARIO)  VALUES (?, ?, ?, ?)';
    await connection.execute(query, [track.nomeProduto, track.dataPrevisao, track.codigoRastreio, track.codigoUsuario]);
    await connection.end();
    return fetchTrack(track.codigoRastreio);
};
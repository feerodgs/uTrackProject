import pkg from 'typescript';
const { resolveModuleName } = pkg;

import models from '../models/models.js';
import { connectToDatabase } from '../utils/database.js';


const Track = models.Track;

export const getTracks = async () => {
    // Todas as encomendas de um usuario
    return "Seus rastreios";
}

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

const isValidCodigoRastreio = (codigoRastreio) => {
    // Exemplo de validação: ajustar conforme necessário
    return typeof codigoRastreio === 'string' && codigoRastreio.length > 0;
};

const sendTrackParams = async (track) => {
    // POST e mandar o codigo da encomenda
    // Salvar a nova track no Banco de Dados

    if (!isValidCodigoRastreio(track.codigoRastreio)) {
        throw new Error('Código de rastreamento inválido');
    }

    // Conectar ao banco de dados
    const connection = await connectToDatabase();
    //console.log(connection);

    // Inserir os dados da track no banco de dados
    const query = 'INSERT INTO TRACK (DATAP_REVISAO, CODIGO_RASTREIO, CODIGO_USUARIO) VALUES (?, ?, ?)';
    await connection.execute(query, [track.dataPrevisao, track.codigoRastreio, track.usuario]);

    console.log(query);
    // console.log(connection);

    console.log(track);

    // Fechar a conexão
    await connection.end();

    // Buscar os detalhes do rastreio
    return fetchTrack(track.codigoRastreio);
};


export const createTrack = async (params) => {
    const track = new Track(params);

    if (!isValidCodigoRastreio(track.codigoRastreio)) {
        throw new Error('Código de rastreamento inválido');
    }

    return sendTrackParams(track);
};

export const deleteTrack = async (id) => {
    // await DeletarTrackPipipiPopopo
    console.log("Track deletado")
    return 'Track deletado'
}

export const getUserTracks = (userId) => {
    //pega query para pegar todas as tracks do user

    return "Todas as tracks do user"
}
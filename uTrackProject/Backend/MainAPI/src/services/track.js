import pkg from 'typescript';
const { resolveModuleName } = pkg;

import models from '../models/models.js';

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

const sendTrackParams = async (track) => {
    // POST e mandar o codigo da encomenda
    // armazenar o codigo do usuario e do rastreio no banco
    // return fetchTrack passando id
    
    return fetchTrack(track.codigoRastreio)
}

export const createTrack = async (params) => {
    const track = new Track({
        usuario: params.usuario,
        codigoRastreio: params.codigoRastreio,
        dataPrevisao: params.dataPrevisao
    })
    return sendTrackParams(track)
}

export const deleteTrack = async (id) => {
    // await DeletarTrackPipipiPopopo
    console.log("Track deletado")
    return 'Track deletado'
}

export const getUserTracks = (userId) => {
    //pega query para pegar todas as tracks do user

    return "Todas as tracks do user"
}
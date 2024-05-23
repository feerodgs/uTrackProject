import models from '../models/models.js';

const Track = models.Track;

export const getTracks = async () => {

    return "Seus rastreios"
}

export const getTrack = async (id) => {
    
    return "Seu rastreio"
}

export const FetchTrack = async (track_auth) => {
    
    return "Seu rastreio da api de rastreio"
}


const sendTrackParams = async (track) => {
    // await CadastrarTrackPipipiPopopo
    return "Track cadastrada no banco"
}

export const createTrack = async (params) => {
    const track = new Track({
        client: params.client,
        token_track: params.token_track,
        track_auth: params.track_auth
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
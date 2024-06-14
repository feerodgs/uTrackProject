import { Router } from 'express'
import { getTracks, getTrack, createTrack, deleteTrack } from '../services/track.js'

const router = Router()

// health check endpoint
router.get("/tracks/:id", async (request, response) => {
    const tracks = await getTracks(request.params.id)
    return response.status(200).send(tracks)
})

// list a track
router.get("/:id", async (request, response) => {
    // código de exemplo: QQ830773725BR
    const track = await getTrack(request.params.id)
    return response.status(200).send(track)
})

// list all user tracks
router.get("/:userId", async (request, response) => {
    const track = await getUserTracks(request.params.trackId)
    return response.status(200).send(track)
})

// new track
router.post("/", async (request, response) => {
    const params = {
        codigoUsuario: request.body.codigoUsuario,
        codigoRastreio: request.body.codigoRastreio,
        dataPrevisao: request.body.dataPrevisao,
        nomeProduto: request.body.nomeProduto
    };

    try {
        const track = await createTrack(params);
        return response.status(201).send(track);
    } catch (error) {
        console.error('Erro ao criar track:', error.message);
        return response.status(500).send({ erro: error.message });
    }
});

// delete track
router.delete("/:id", async (request, response) => {
    await deleteTrack(request.params.id)
    return response.status(204).send()
})

export default router
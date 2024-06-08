import { Router } from 'express'
import { getTracks, getTrack, createTrack, deleteTrack, getUserTracks } from '../services/track.js'

const router = Router()

// health check endpoint
router.get("/", async (request, response) => {
    const tracks = await getTracks()
    return response.status(200).send(tracks)
})

// list a track
router.get("/:id", async (request, response) => {
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
        usuario: request.body.usuario,
        codigoRastreio: request.body.codigoRastreio,
        dataPrevisao: request.body.dataPrevisao
    }
    console.log(params)
    const track = await createTrack(params)
    return response.status(201).send(track)
})

// delete track
router.delete("/:id", async (request, response) => {
    await deleteTrack(request.params.id)
    return response.status(204).send()
})


export default router
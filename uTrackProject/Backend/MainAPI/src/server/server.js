import express from 'express'
import tracksController from '../controller/tracks.js'
import userController from '../controller/users.js'

const app = express()
app.use(express.json())

app.get("/", (request, response) => {
  response.status(200).send("API rodando na porta 3000!")
})

app.use('/tracks', tracksController)
app.use('/users', userController)

export default app;
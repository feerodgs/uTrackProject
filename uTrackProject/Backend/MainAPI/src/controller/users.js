import { Router } from 'express'
import { getUsers, createUser } from '../services/user.js'

const router = Router()

// list all users
router.get("/", async (request, response) => {
    const users = await getUsers()
    return response.status(200).send(users)
})

// list an user by id
router.get("/:id", async (request, response) => {
    const user = await getUser(request.params.email)
    return response.status(200).send(user)
})

// new user
router.post("/", async (request, response) => {
    const params = {
        email: request.body.email,
    }
    const user = await createUser(params)
    return response.status(201).send(user)
})

router.delete("/:id", async (request, response) => {
    await deleteUser(request.params.id)
    
    return response.status(204).send()
})

export default router
import models from '../models/models.js';

const User = models.User;

export const getUsers = async () => {
    return "Tó teus users ????"
}

const sendUserParams = async (user) => {
    return "Usuário cadastrado com sucesso"
}

export const createUser = async (params) => {
    const user = new User({
        email: params.email,
    })
    return sendUserParams(user)
}
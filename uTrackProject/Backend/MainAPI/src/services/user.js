import models from '../models/models.js';

const User = models.User;

export const getUsers = async () => {

    return "Tó teus users"
}

export const getUser = async (id) => {
    
    return "Tó teu user"
}


const sendUserParams = async (user) => {
    // await CadastrarUserPipipiPopopo
    return "Usuário cadastrado com sucesso"
}

export const createUser = async (params) => {
    const user = new User({
        email: params.email,
    })
    return sendUserParams(user)
}

export const deleteUser = async (id) => {
    // await DeletarUserPipipiPopopo
    console.log("User deletado")
    return 'User deletado'
}

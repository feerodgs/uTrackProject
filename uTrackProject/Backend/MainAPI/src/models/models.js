class User {
    constructor(params) {
        const { email } = params;

        if (!email) {
            throw new Error("Nome e email são obrigatórios.");
        }
        this.email = email;
    }
}

class Track {
    constructor(params) {
        const { usuario, codigoRastreio, dataPrevisao } = params;
        if (!usuario) {
            throw new Error("Usuario não encontrado.");
        }
        if (!!codigoRastreio) {
            throw new Error("Código de rastreio não encontrado.");
        }

        this.usuario = usuario;
        this.codigoRastreio = codigoRastreio;
        this.dataPrevisao = dataPrevisao
    }
}

export default { User, Track };
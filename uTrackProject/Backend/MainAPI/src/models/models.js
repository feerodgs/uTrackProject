class User {
    constructor(params) {
        const {nome, email} = params;

        if (!nome || !email) {
            throw new Error("Nome e email são obrigatórios.");
        }
        this.nome = nome;
        this.email = email;
    }
}

class Track {
    constructor(params) {
        const { client, token_track, track_auth } = params;
        if (!client || !token_track || !track_auth) {
            throw new Error("Client, token_track e track_auth são obrigatórios.");
        }
        this.client = client;
        this.token_track = token_track;
        this.track_auth = track_auth;
    }
}

export default { User, Track };

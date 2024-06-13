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
        const { nomeProduto, dataPrevisao, codigoRastreio, codigoUsuario } = params;

        if (!nomeProduto) {
            throw new Error("Nome do Produto não Informado.");
        }

        if (!codigoRastreio) {
            throw new Error("Código de rastreio não encontrado.");
        }

        if (!codigoUsuario) {
            throw new Error("Usuario não encontrado."); x
        }
        this.codigoUsuario = codigoUsuario;
        this.codigoRastreio = codigoRastreio;
        this.dataPrevisao = dataPrevisao;
        this.nomeProduto = nomeProduto;
    }
}

export default { User, Track };
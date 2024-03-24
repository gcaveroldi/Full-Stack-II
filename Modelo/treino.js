import TreinoBD from "../Persistencia/treinoBD.js";

export default class Treino {
    #codigo;
    #categoria;

    constructor(codigo = 0, categoria = "") {
        this.#codigo = codigo;
        this.#categoria = categoria;
    }

    get codigo() {
        return this.#codigo;
    }
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get categoria() {
        return this.#categoria;
    }
    set categoria(novaCategoria) {
        this.#categoria = novaCategoria;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            categoria: this.#categoria
        };
    }

    // Camada de modelo acessa a camada de persistência
    async gravar() {
        const treinoBD = new TreinoBD();
        await treinoBD.gravar(this);
    }

    async excluir() {
        const treinoBD = new TreinoBD();
        await treinoBD.excluir(this);
    }

    async alterar() {
        const treinoBD = new TreinoBD();
        await treinoBD.atualizar(this);
    }

    async consultar(termo) {
        const treinoBD = new TreinoBD();
        await treinoBD.consultar(termo);
    }
}

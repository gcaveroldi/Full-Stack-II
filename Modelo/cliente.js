import ClienteBD from "../Persistencia/clienteBD.js";

export default class Cliente {
    #id;
    #nome;
    #sobrenome;
    #cidade;
    #cep;
    #id_treino;

    constructor(id = null, nome = null, sobrenome = null, cidade = null, cep = null, id_treino = null) {
        this.#id = id;
        this.#nome = nome;
        this.#sobrenome = sobrenome;
        this.#cidade = cidade;
        this.#cep = cep;
        this.#id_treino = id_treino;
    }

    get id() {
        return this.#id;
    }
    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get sobrenome() {
        return this.#sobrenome;
    }
    set sobrenome(novoSobrenome) {
        this.#sobrenome = novoSobrenome;
    }

    get cidade() {
        return this.#cidade;
    }
    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get cep() {
        return this.#cep;
    }
    set cep(novoCep) {
        this.#cep = novoCep;
    }

    get id_treino() {
        return this.#id_treino;
    }
    set id_treino(novoIdTreino) {
        this.#id_treino = novoIdTreino;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            sobrenome: this.#sobrenome,
            cidade: this.#cidade,
            cep: this.#cep,
            id_treino: this.#id_treino
        };
    }

    // Camada de modelo acessa a camada de persistência
    async gravar() {
        const clienteBD = new ClienteBD();
        await clienteBD.gravar(this);
    }

    async excluir() {
        const clienteBD = new ClienteBD();
        await clienteBD.excluir(this);
    }

    async alterar() {
        const clienteBD = new ClienteBD();
        await clienteBD.atualizar(this);
    }

    async consultar(termo) {
        const clienteBD = new ClienteBD();
        await clienteBD.consultar(termo);
    }
}

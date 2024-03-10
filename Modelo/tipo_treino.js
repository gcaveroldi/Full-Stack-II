import tipo_treinoBD from "../Persistencia/tipo_treinoBD.js";

export default class Tipo_Treino{
    #nome;
    #descricao;
    
    

    constructor(nome=0, descricao=0, 
                
                ){
        this.#nome=nome;
        this.#descricao=descricao;
       
    }

    get tipo_treino(){
        return this.#nome;
    }
    set tipo_treino(novoTreino){
        this.#nome = novoTreino;
    }

    get tipo_treino(){
        return this.#descricao;
    }

    
    set tipo_treino(novoTreino){
        this.#descricao=novoTreino;
    }
    

    toJSON(){
        return {
            nome:this.#nome,
            descricao:this.#descricao,
                        
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const Tipo_treinoBD = new tipo_treinoBD();
        await Tipo_treinoBD.gravar(this);
     }
 
     async excluir(){
        const Tipo_treinoBD = new tipo_treinoBD();
        await Tipo_treinoBD.excluir(this);
     }
 
     async alterar(){
        const Tipo_treinoBD = new tipo_treinoBD();
        await Tipo_treinoBD.atualizar(this);
     }
 
     async consultar(){
        const Tipo_treinoBD = new tipo_treinoBD();
        await Tipo_treinoBD.consultar(this);;
     }

}
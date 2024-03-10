import Tipo_TreinoBD from "../Persistencia/tipo_treinoBD.js";

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

    set tipo_treino(novoTtrein){
        this.#descricao=novoTtrein;
    }

    

    toJSON(){
        return {
            nome:this.#nome,
            descricao:this.#descricao,
                        
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const tipo_treinoBD = new tipo_treinoBD();
        await tipo_treinoBD.gravar(this);
     }
 
     async excluir(){
        const tipo_treinoBD = new tipo_treinoBD();
        await tipo_treinoBD.excluir(this);
     }
 
     async alterar(){
        const tipo_treinoBD = new tipo_treinoBD();
        await tipo_treinoBD.atualizar(this);
     }
 
     async consultar(termo){
        const tipo_treinoBD = new tipo_treinoBD();
        await tipo_treinoBD.consultar(this);;
     }

}
import TreinoBD from "../Persistencia/treinoBD.js";

export default class Treino{
    #treino;
    #tipotreino;
    
    

    constructor(treino=0, tipotreino=0, 
                
                ){
        this.#treino=treino;
        this.#tipotreino=tipotreino;
       
    }

    get treino(){
        return this.#treino;
    }
    set treino(novoTreino){
        this.#treino = novoTreino;
    }

    get tipotreino(){
        return this.#tipotreino;
    }

    set tipotreino(novoTtrein){
        this.#tipotreino=novoTtrein;
    }

    

    toJSON(){
        return {
            treino:this.#treino,
            tipotreino:this.#tipotreino,
                        
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const treinoBD = new TreinoBD();
        await treinoBD.gravar(this);
     }
 
     async excluir(){
        const treinoBD = new TreinoBD();
        await treinoBD.excluir(this);
     }
 
     async alterar(){
        const treinoBD = new TreinoBD();
        await treinoBD.atualizar(this);
     }
 
     async consultar(termo){
        const treinoBD = new TreinoBD();
        await treinoBD.consultar(this);;
     }

}
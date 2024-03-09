import ClienteBD from "../Persistencia/clienteBD.js";

export default class Cliente{
    #codigo;
    #nome;
    #datanasc;
    

    constructor(codigo=null, nome=null, 
                datanasc=null
                ){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#datanasc=datanasc;
        
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNom){
        this.#nome=novoNom;
    }

    get datanasc(){
        return this.#datanasc;
    }

    set datanasc(novaDat){
        this.#datanasc = novaDat;
    }



    toJSON(){
        return {
            codigo:this.#codigo,
            nome:this.#nome,
            datanasc:this.#datanasc,
            
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const clienteBD = new ClienteBD();
        await clienteBD.gravar(this);
     }
 
     async excluir(){
        const clienteBD = new ClienteBD();
        await clienteBD.excluir(this);
     }
 
     async alterar(){
        const clienteBD = new ClienteBD();
        await clienteBD.atualizar(this);
     }
 
     async consultar(termo){
        const clienteBD = new ClienteBD();
        await clienteBD.consultar(this);;
     }

}
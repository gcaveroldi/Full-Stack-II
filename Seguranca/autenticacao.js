import { assinar, verificarAssinatura } from "./funcoesJWT.js";

export function autenticar(requisicao, resposta){
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === 'admin' && senha === 'admin'){
        requisicao.session.usuarioAutenticado = usuario;
        resposta.json({
            "status": true,
            "token": assinar({usuario})
        })
    }
    else{
        requisicao.session.usuarioAutenticado = null;
        resposta.status(401).json({
            "status": false,
            "mensagem": "Usuário ou senha inválidos!"
        })
    }
}
export function verificarAcesso(requisicao, resposta, next){
    const token = requisicao.headers['authorization'];
    let tokenDecodificado = '';
    if(token){
       tokenDecodificado = verificarAssinatura(token);
    }
       
    if (tokenDecodificado == requisicao.session.usuarioAutenticado){
        next();

    }
    else{
        resposta.status(401).json({
            "status": false,
            "mensagem": "Acesso Negado realize o Login corretamente!"

        })
    }
}

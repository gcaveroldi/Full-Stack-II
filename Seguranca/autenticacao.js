import { assinar, verificarAssinatura } from "./funcoesJWT.js";

export function autenticar(usuario, senha){
    const usuario = reqisicao.body.usuario;
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
export function verificarAcesso(reqisicao, resposta, next){
    const token = reqisicao.headers['authorization'];
    const tokenDecodificado = verificarAssinatura(token);
    if (tokenDecodificado == reqisicao.session.usuarioAutenticado){
        next();

    }
    else{
        resposta.status(401).json({
            "status": false,
            "mensagem": "Acesso Negado realize o Login corretamente!"

        })
    }
}
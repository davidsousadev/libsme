import style from './style.js';  // Importa o estilo

const MAX_NOTIFICACOES = 3; // Limite de notificações visíveis

function mostrarNotificacao(mensagem, opcoes = {}) {
    const notificacao = document.createElement("div");
    notificacao.className = "notificacao";
    
    // Atribuindo o ID único para cada notificação
    notificacao.id = "notificacao-" + Date.now();
    
    // Definindo as opções da notificação
    const cor = opcoes.cor || '#243447';
    const duracao = opcoes.duracao || 5000;
    const movimentoEntrada = opcoes.movimentoEntrada || 'despencar';
    const movimentoSaida = opcoes.movimentoSaida || 'desaparecer';
    let posicao = opcoes.posicao || 'top-right';

    const posicoesValidas = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
    if (!posicoesValidas.includes(posicao)) {
        posicao = 'top-right';
    }

    // Ajuste das posições
    setPosicao(notificacao, posicao);

    notificacao.style.backgroundColor = cor;
    notificacao.style.position = 'fixed';
    notificacao.style.animation = `${movimentoEntrada} 0.5s ease`;

    notificacao.innerHTML = `
        <p>${mensagem}</p>
        <span class="botao-fechar" onclick="fecharNotificacao('${notificacao.id}')">×</span>
        <div class="barra-progresso"></div>
    `;

    document.getElementById("containerNotificacoes").appendChild(notificacao);

    // Barra de progresso
    setTimeout(() => {
        notificacao.classList.add('mostra');
    }, 50);

    // Remover a notificação após a duração
    setTimeout(() => {
        notificacao.style.animation = `${movimentoSaida} 0.5s ease`;
        setTimeout(() => {
            notificacao.remove();
        }, 500);
    }, duracao);

    // Limitar notificações visíveis
    limitNotificacoes();
}

function setPosicao(notificacao, posicao) {
    switch (posicao) {
        case 'top-right':
            notificacao.style.top = '20px';
            notificacao.style.right = '20px';
            break;
        case 'top-left':
            notificacao.style.top = '20px';
            notificacao.style.left = '20px';
            break;
        case 'bottom-right':
            notificacao.style.bottom = '20px';
            notificacao.style.right = '20px';
            break;
        case 'bottom-left':
            notificacao.style.bottom = '20px';
            notificacao.style.left = '20px';
            break;
    }
}

function limitNotificacoes() {
    const notificacoesAtivas = document.querySelectorAll('.notificacao');
    if (notificacoesAtivas.length > MAX_NOTIFICACOES) {
        const notificacaoMaisAntiga = notificacoesAtivas[0];
        notificacaoMaisAntiga.style.animation = 'deslizarEsquerda 0.5s ease';
        setTimeout(() => {
            notificacaoMaisAntiga.remove();
        }, 500);
    }
}

function fecharNotificacao(id) {
    const notificacao = document.getElementById(id);
    notificacao.style.animation = 'desaparecer 0.5s ease';
    setTimeout(() => {
        notificacao.remove();
    }, 500);
}

export { mostrarNotificacao, fecharNotificacao };

const MAX_NOTIFICACOES = 3;

function inicializar() {
    document.getElementById("botaoNotificacao").onclick = mostrarNotificacao;
    //setInterval(simularNotificacaoServidor, 5000);
}

function mostrarNotificacao() {
    const notificacao = criarNotificacao("Texto da notificação");
    adicionarNotificacaoAoContainer(notificacao);
    gerenciarNotificacoes();
}

function simularNotificacaoServidor() {
    mostrarNotificacao();
}

function criarNotificacao(mensagem) {
    const notificacao = document.createElement("div");
    notificacao.className = "notificacao";
    notificacao.id = "notificacao-" + Date.now();
    notificacao.innerHTML = `
        <span class="botao-fechar" onclick="fecharNotificacao('${notificacao.id}')">×</span>
        <p>${mensagem}</p>
        <div class="barra-progresso"></div>
    `;
    return notificacao;
}

function adicionarNotificacaoAoContainer(notificacao) {
    const containerNotificacoes = document.getElementById("containerNotificacoes");
    containerNotificacoes.appendChild(notificacao);
    setTimeout(() => {
        notificacao.classList.add("mostra");
        reiniciarBarraProgresso(notificacao);
    }, 10);
    setTimeout(() => {
        fecharNotificacao(notificacao.id);
    }, 5000);
}

function reiniciarBarraProgresso(notificacao) {
    const barraProgresso = notificacao.querySelector(".barra-progresso");
    barraProgresso.style.animation = 'none';
    void barraProgresso.offsetWidth;
    barraProgresso.style.animation = '';
}

function gerenciarNotificacoes() {
    const containerNotificacoes = document.getElementById("containerNotificacoes");
    if (containerNotificacoes.children.length > MAX_NOTIFICACOES) {
        const notificacaoMaisAntiga = containerNotificacoes.children[0];
        fecharNotificacao(notificacaoMaisAntiga.id);
    }
}

function fecharNotificacao(notificacaoId) {
    const notificacao = document.getElementById(notificacaoId);
    if (notificacao) {
        notificacao.classList.remove("mostra");
        setTimeout(() => {
            notificacao.remove();
        }, 500);
    }
}

inicializar();

// Constante para o número máximo de notificações visíveis
const MAX_NOTIFICACOES = 11; 

/**
 * Função principal para exibir notificações
 * @param {string} mensagem - O texto da notificação.
 * @param {Object} opcoes - Configurações adicionais da notificação.
 * @param {string} [opcoes.cor='#243447'] - Cor de fundo da notificação.
 * @param {number} [opcoes.duracao=5000] - Duração em milissegundos para a exibição da notificação.
 * @param {string} [opcoes.movimentoEntrada='despencar'] - Animação de entrada da notificação.
 * @param {string} [opcoes.movimentoSaida='desaparecer'] - Animação de saída da notificação.
 * @param {string} [opcoes.posicao='top-right'] - Posição da notificação na tela.
 */
function mostrarNotificacao(mensagem, opcoes = {}) {
    const container = obterOuCriarContainer();
    const notificacoesExistentes = container.querySelectorAll(".notificacao");

    // Verifica se o número máximo de notificações foi atingido
    if (notificacoesExistentes.length >= MAX_NOTIFICACOES) {
        // Remove a primeira notificação para abrir espaço
        notificacoesExistentes[0].remove();
    }

    const notificacao = criarNotificacao(mensagem, opcoes);
    container.appendChild(notificacao);

    const movimentoSaida = opcoes.movimentoSaida || 'desaparecer';
    setTimeout(() => {
        fecharNotificacao(notificacao, movimentoSaida);
    }, opcoes.duracao || 10000);
}

/**
 * Verifica ou cria o container de notificações, se necessário.
 * @returns {HTMLElement} - O container de notificações.
 */
function obterOuCriarContainer() {
    let container = document.getElementById("containerNotificacoes");
    if (!container) {
        container = document.createElement("div");
        container.id = "containerNotificacoes";

        // Estilos para evitar interferências
        container.style.position = "fixed"; // Sempre visível
        container.style.zIndex = 1000; // Abaixo de overlays importantes, mas acima de conteúdos normais
        container.style.pointerEvents = "none"; // Ignora cliques no container
        container.style.width = "fit-content";
        container.style.maxWidth = "90%"; // Para evitar que notificações fiquem muito largas
        container.style.maxHeight = "90vh"; // Limita a altura para não ocupar a tela toda
        container.style.overflowY = "auto"; // Rola se houver muitas notificações
        container.style.padding = "10px";
        container.style.boxSizing = "border-box";

        // Ajuste para mobile
        container.style.right = "10px"; // Distância da borda direita
        container.style.bottom = "10px"; // Distância da borda inferior

        document.body.appendChild(container);
    }
    return container;
}


/**
 * Cria uma notificação e ajusta seus estilos e elementos
 * @param {string} mensagem - Texto da notificação.
 * @param {Object} opcoes - Configurações adicionais da notificação.
 * @returns {HTMLElement} - A notificação criada.
 */
/**
 * Cria uma notificação e ajusta seus estilos e elementos
 * @param {string} mensagem - Texto da notificação.
 * @param {Object} opcoes - Configurações adicionais da notificação.
 * @returns {HTMLElement} - A notificação criada.
 */
function criarNotificacao(mensagem, opcoes) {
    const notificacao = document.createElement("div");
    notificacao.className = "notificacao";
    notificacao.style.pointerEvents = "auto";
    notificacao.id = "notificacao-" + Date.now();

    // Definir propriedades de cor e duração
    const cor = opcoes.cor || '#243447';
    const duracao = opcoes.duracao || 10000;
    const movimentoEntrada = opcoes.movimentoEntrada || 'despencar';
    const movimentoSaida = opcoes.movimentoSaida || 'desaparecer';
    let posicao = opcoes.posicao || 'top-right';

    // Validação da posição
    const posicoesValidas = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
    if (!posicoesValidas.includes(posicao)) {
        posicao = 'top-right'; // Posição padrão
    }

    notificacao.style.backgroundColor = cor;
    notificacao.style.position = 'fixed';
    notificacao.style.animation = `${movimentoEntrada} 0.5s ease`;
    notificacao.style.zIndex = 1000;
    notificacao.classList.add(posicao);

    ajustarPosicao(notificacao, posicao);

    // Criar a barra de progresso
    const barraProgresso = document.createElement("div");
    barraProgresso.className = "barra-progresso";
    barraProgresso.style.backgroundColor = '#ffffff';
    barraProgresso.style.animation = `progresso ${duracao}ms linear forwards`;

    // Adicionar conteúdo e botão de fechar
    const conteudo = document.createElement("p");
    conteudo.className = "conteudo-notificacao";
    conteudo.textContent = mensagem;

    const botaoFechar = document.createElement("span");
    botaoFechar.className = "botao-fechar";
    botaoFechar.textContent = "×";
    botaoFechar.onclick = () => fecharNotificacao(notificacao, movimentoSaida);

    notificacao.appendChild(conteudo);
    notificacao.appendChild(botaoFechar);
    notificacao.appendChild(barraProgresso);

    // Após a criação do conteúdo, agora definimos o contraste
    definirContraste(notificacao, cor);

    return notificacao;
}

/**
 * Ajusta a posição da notificação na tela com base nas notificações existentes.
 * @param {HTMLElement} notificacao - O elemento da notificação.
 * @param {string} posicao - A posição onde a notificação será exibida.
 */
function ajustarPosicao(notificacao, posicao) {
    const container = document.getElementById("containerNotificacoes");
    if (!container) return;

    let deslocamento = 10;
    if (posicao.startsWith('top')) {
        deslocamento += calcularDeslocamento(container, posicao);
        notificacao.style.top = `${deslocamento}px`;
    } else {
        deslocamento += calcularDeslocamento(container, posicao);
        notificacao.style.bottom = `${deslocamento}px`;
    }

    if (posicao.endsWith('right')) {
        notificacao.style.right = '10px';
    } else {
        notificacao.style.left = '10px';
    }
}


/**
 * Calcula o deslocamento com base no número de notificações existentes na posição.
 * @param {HTMLElement} container - O container onde as notificações são exibidas.
 * @param {string} posicao - A posição da notificação (top-right, bottom-left, etc.).
 * @returns {number} - O valor de deslocamento para a posição da nova notificação.
 */
function calcularDeslocamento(container, posicao) {
    const notificacoes = Array.from(container.querySelectorAll(`.notificacao.${posicao}`));
    return notificacoes.reduce((acumulado, el) => acumulado + el.offsetHeight + 10, 0);
}

/**
 * Define a cor do texto e da barra de progresso com base na luminosidade do fundo.
 * @param {HTMLElement} notificacao - O elemento da notificação.
 * @param {string} corFundo - Cor de fundo da notificação.
 */
function definirContraste(notificacao, corFundo) {
    const { texto, barra } = escolherContraste(corFundo);
    const p = notificacao.querySelector('.conteudo-notificacao');
    p.style.color = texto;

    const barraProgresso = notificacao.querySelector('.barra-progresso');
    barraProgresso.style.backgroundColor = barra;
}

/**
 * Escolhe a cor do texto e da barra de progresso com base na luminosidade da cor de fundo.
 * @param {string} corFundo - A cor de fundo da notificação.
 * @returns {Object} - Objeto com as cores de texto e barra.
 */
function escolherContraste(corFundo) {
    let luminosidade = calcularLuminosidade(corFundo);
    if (luminosidade < 0.5) {
        return {
            texto: '#ffffff',
            barra: '#ffffff'
        };
    } else {
        return {
            texto: '#000000',
            barra: '#000000'
        };
    }
}

/**
 * Função para calcular a luminosidade de uma cor.
 * @param {string} cor - A cor em formato hexadecimal.
 * @returns {number} - Valor de luminosidade.
 */
function calcularLuminosidade(cor) {
    cor = cor.replace('#', '');
    let r = parseInt(cor.substring(0, 2), 16);
    let g = parseInt(cor.substring(2, 4), 16);
    let b = parseInt(cor.substring(4, 6), 16);

    let a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Função para fechar a notificação.
 * @param {HTMLElement} notificacao - O elemento da notificação.
 */
function fecharNotificacao(notificacao, movimentoSaida) {
    notificacao.style.animation = `${movimentoSaida} 0.5s ease`;
    setTimeout(() => {
        notificacao.remove();
        ajustarPosicoes();
    }, 500);
}

/**
 * Ajusta as posições das notificações restantes após a remoção de uma notificação.
 */
function ajustarPosicoes() {
    const container = document.getElementById("containerNotificacoes");
    if (!container) return;

    const notificacoes = container.querySelectorAll(".notificacao");
    let deslocamento = 10;

    notificacoes.forEach(notificacao => {
        if (notificacao.style.top) {
            notificacao.style.top = `${deslocamento}px`;
        } else if (notificacao.style.bottom) {
            notificacao.style.bottom = `${deslocamento}px`;
        }
        deslocamento += notificacao.offsetHeight + 10;
    });
}

export { mostrarNotificacao, fecharNotificacao };

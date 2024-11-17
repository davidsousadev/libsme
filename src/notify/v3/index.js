import link from './style.js';  // Importa o estilo

import { mostrarNotificacao, fecharNotificacao } from './notify.js';

// Expondo funções globalmente para facilitar o acesso em qualquer lugar do código
window.link = link;
window.mostrarNotificacao = mostrarNotificacao;
window.fecharNotificacao = fecharNotificacao;

export default { mostrarNotificacao, fecharNotificacao };



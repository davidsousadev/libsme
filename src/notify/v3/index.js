import { mostrarNotificacao, fecharNotificacao } from './notify.js';

// Expondo funções globalmente para facilitar o acesso em qualquer lugar do código
window.mostrarNotificacao = mostrarNotificacao;
window.fecharNotificacao = fecharNotificacao;

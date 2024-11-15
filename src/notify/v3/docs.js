function copiarCodigo(elemento) {
    const codigo = document.getElementById(elemento).innerText;
    navigator.clipboard.writeText(codigo).then(() => {
        mostrarNotificacao("Código copiado para a área de transferência!");
    }).catch(err => {
        console.error("Erro ao copiar o código: ", err);
    });
}

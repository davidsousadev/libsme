const style = document.createElement("style");
style.textContent = `
  #containerNotificacoes {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 9999;
  }

  .notificacao {
    background-color: #243447; 
    color: #ffffff;
    padding: 15px;
    border: 1px solid #1a2a38;
    border-radius: 4px;
    width: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-family: Arial, sans-serif;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .notificacao.mostra {
    opacity: 1;
    transform: translateY(0);
  }

  .botao-fechar {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  .barra-progresso {
    height: 5px;
    background-color: #5294e2; 
    margin-top: 10px;
    width: 100%;
    border-radius: 0 0 4px 4px; 
    position: absolute;
    bottom: 0;
    left: 0;
    animation: progresso 5s linear forwards;
  }

  @keyframes progresso {
    from { width: 100%; }
    to { width: 0%; }
  }

  /* Animações de entrada */
  @keyframes despencar {
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes popUp {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes deslizarDireita {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes deslizarEsquerda {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes subir {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes desaparecer {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  /* Responsividade */
  @media (max-width: 768px) {
    #containerNotificacoes {
      top: 10px;
      right: 10px;
      left: 10px;
      bottom: 10px;
      gap: 8px;
    }

    .notificacao {
      width: 90%; 
      font-size: 14px;
    }

    .barra-progresso {
      height: 4px; 
    }
  }

  @media (max-width: 480px) {
    #containerNotificacoes {
      top: 5px;
      right: 5px;
      left: 5px;
    }

    .notificacao {
      width: 100%; 
      font-size: 12px; 
      padding: 12px;
    }
  }
`;

document.head.appendChild(style);

export default style;

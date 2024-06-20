import React from 'react';
import '../../styles/styles.css';

function ConsertoMicroondas(props) {
    return (
      <div className="centralizado" style={{ marginBottom: '-50px', marginTop: '150px' }}>
        <div className="product-info">
          <h2 className="centralizado">Conserto de Microondas</h2>
          <img
            src="../Imagens/retangulo laranja.jpg"
            alt="retangulo laranja"
            width="75"
            height="4"
            className="imagem-centralizada"
          />
          <br />
        </div>
        <div className="centralizado" style={{ marginTop: '-1px' }}>
          <img
            src="../Imagens/conserto.png"
            alt="conserto de microondas"
            width="950"
            height="350"
            style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>
      </div>
    );
  }
  
  export default ConsertoMicroondas;
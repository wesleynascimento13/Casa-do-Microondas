import React from 'react';
import '../../styles/styles.css';


function Sobre(props) {
    return (
      <section id="sobre">
        <div className="centralizado" style={{ marginBottom: '-50px', marginTop: '-50px' }}>
          <div className="product-info">
            <h2 className="centralizado">Sobre nós</h2>
            <img src="../Imagens/retangulo laranja.jpg" alt="retangulo laranja" width="75" height="4" className="imagem-centralizada" />
            <br />
          </div>
          <div className="centralizado" style={{ marginTop: '-1px' }}>
            <img
              src="../Imagens/sobre.png"
              alt="gif sobre a Casa do microondas"
              width="950"
              height="350"
              style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      </section>
    );
  }
  
export default Sobre;
import React from 'react';
import '../../styles/styles.css';

function Marca(props) {
    return (
      <div>
        <h2 className="centralizado">Marcas licenciadas</h2>
        <img src="../Imagens/retangulo laranja.jpg" alt="retangulo laranja" width="75" height="4" className="imagem-centralizada" />
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <img src="../gifs/marcas2.gif" alt="logo brastemp" style={{ maxWidth: '100%', height: 'auto' }} className="imagem-margem" />
        </div>
      </div>
    );
  }
export default Marca;
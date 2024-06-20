import React from 'react';
import '../../styles/styles.css';
import consertoEm30MinImg from '../../Imagens/conserto_em_30_min.png';

function Conserto30Minutos(props) {
    return (
      <div className="centralizado" style={{ marginBottom: '50px', marginTop: '70px' }}>
        <div className="centralizado" style={{ marginTop: '-1px' }}>
          <img
            src={consertoEm30MinImg} 
            alt="conserto de microondas em 30 minutos"
            width="950"
            height="350"
            style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>
      </div>
    );
}

export default Conserto30Minutos;
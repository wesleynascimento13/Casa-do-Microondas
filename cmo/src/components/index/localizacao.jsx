import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom'; 
import '../../styles/styles.css';

function Localizacao(props) {
  const [activeLocation, setActiveLocation] = useState('SF');
  const handleLocationChange = (location) => {
    setActiveLocation(location);
  };

  useEffect(() => {
    const servicosSection = document.getElementById('localizacao');
    if (servicosSection) {
        servicosSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  return (
    <section id="localizacao">
      <div id="response-message"></div>

      <h2 id="Localização" style={{ marginTop: '70px', marginLeft: '45%' }}>Localização</h2>

      <img src={props.img} alt="retangulo laranja" width="75" height="4" className="imagem-centralizada" />
      <div className='centralizado'>
        <button 
          className="button" 
          style={{ 
            backgroundColor: activeLocation === 'SF' ? 'rgb(179, 0, 0)' : '#ff5906',
            color: activeLocation === 'SF' ? 'white' : 'white' 
          }} 
          onClick={() => handleLocationChange('SF')}
        >
          {props.nome_local}
        </button>
        <button 
          className="button" 
          style={{ 
            backgroundColor: activeLocation === 'Rebouças' ? 'rgb(179, 0, 0)' : '#ff5906',
            color: activeLocation === 'Rebouças' ? 'white' : 'white'
          }} 
          onClick={() => handleLocationChange('Rebouças')}
        >
          Rebouças
        </button>
      </div>
      {activeLocation === 'SF' && (
        <div className="container-produto margem-produto" id="SF">
          <div className="informacoes-produto">
            <h2><span className="tamanho_fonte_3">{props.endereco}</span></h2>
            <a href="https://wa.me/5541985163602">
              <p><img src={props.icone_whatsapp} alt="icone whatsapp" width="30" height="30" />{props.num_whatsapp}</p>
            </a>
            <p><img src={props.icone_tel} alt="telefone laranja" width="18" height="18" />{props.numero}</p>
            <p><img src={props.icone_email} alt="icone de email laranja" width="20" height="20" /> {props.email}</p>
            <p><img src={props.icone_relogio} alt="icone de relogio laranja" width="18" height="18" />{props.horario}</p>
          </div>
          <div className="mapa-container">
            <div className="mapa">
              <iframe
                title="Mapa de Localização"
                src={props.maps}
                width="600"
                height="450"
                
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      )}
      {activeLocation === 'Rebouças' && (
        <div className="container-produto margem-produto" id="Rebouças">
        <div className="informacoes-produto">
          <h2>
            <span className="tamanho_fonte_3">
                Av. Pres. Kennedy, 410 - Rebouças, Curitiba - PR, 80220-200, Brasil
            </span>
          </h2>
      
          <p>
            <a href="https://wa.me/5541985163600" target="_blank" rel="noreferrer">
              <img src={props.icone_whatsapp} alt="icone whatsapp" width="25" height="25" />
              +55 41 9 8516-3600
            </a>
          </p>
      
            <p>
              <img src={props.icone_tel} alt="telefone laranja" width="18" height="18" />
              +55-41 3332-8000
            </p>
        
            <p>
              <img src={props.icone_relogio} alt="icone de relogio laranja" width="18" height="18" />
              Seg-Sex- 08:30 às 17:30; Sábado 09:00 as 13h
            </p>
          </div>
          <div className="mapa-container">
            <div className="mapa">
              <iframe
                title="Mapa de Localização2"
                src={props.maps2}
                width="600"
                height="450"
              
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
      </div>
      )}
    </section>
  );
}

export default Localizacao;
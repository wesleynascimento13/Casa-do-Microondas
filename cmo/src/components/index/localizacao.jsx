import React, { useEffect }  from 'react';
import { Link } from 'react-router-dom'; 
import '../../styles/styles.css';

function Localizacao(props) {

  useEffect(() => {
    const servicosSection = document.getElementById('localizacao');
    if (servicosSection) {
        servicosSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
    return (
      <section id="localizacao">
        <div id="response-message"></div>
  
        <h2 id="Localização" style={{ marginTop: '100px' }}>Localização</h2>
  
        <img src={props.img} alt="retangulo laranja" width="75" height="4" className="imagem-centralizada" />
  
        <a href="página SF.html#SF"><button className="button" style={{ backgroundColor: 'rgb(179, 0, 0)' }}>{props.nome_local}</button></a>
        <a href="página R.html#Rebouças"><button className="button">Rebouças</button></a>
  
        <div className="container-produto margem-produto" id="SF">
          <div className="informacoes-produto">
            <h2><span className="tamanho_fonte_3">{props.endereco}</span></h2>
            <a href="https://wa.me/5541985163602">
              <p><img src={props.icone_whatsapp} alt="icone whatsapp" width="30" height="30" />{props.num_whatsapp}</p>
            </a>
            <p><img src={props.icone_tel} alt="telefone laranja" width="18" height="18" />{props.numero}</p>
            <p><img src={props.icone_email} alt="icone de e-mial laranja" width="20" height="20" /> {props.email}</p>
            <p><img src={props.icone_relogio} alt="icone de relogio laranja" width="18" height="18" />{props.horario}</p>
          </div>
          <div className="mapa-container">
            <div className="mapa">
              <iframe src={props.maps}></iframe>
            </div>
          </div>
        </div>
      </section>
    );
  }

export default Localizacao;
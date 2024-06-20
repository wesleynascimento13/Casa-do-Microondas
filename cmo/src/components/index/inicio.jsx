import React from 'react';
import { Link } from 'react-router-dom'; 
import '../../styles/styles.css';


function Inicio(props) {
    return (
      <div className="image-container" id="inicio">
        <img src={props.url1} alt="imagem do início" width="100%" height="700" />
        <div className="image-text">
          <span className="highlight-text"><strong>{props.marca}</strong></span> <br />
          <img src={props.url2} alt="imagem preta" width="75" height="4" /> <br /> <br />
          <span className="tamanho_fonte_1">{props.descricao}</span> <br />
          <Link to={props.href1}>
            <button className="black-button">{props.botao_inicio_1}</button>
          </Link>
        </div>
      </div>
    );
  }
export default Inicio;

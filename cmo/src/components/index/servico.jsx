import React, { useEffect }  from 'react';
//import { Link } from 'react-router-dom'; 
import '../../styles/styles.css';

function Servico(props) {

  useEffect(() => {
    const servicosSection = document.getElementById('servicos');
    if (servicosSection) {
        servicosSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

    return (
      <div id="servicos">
            <a href={props.rota_servico} className="servico">
                <h2>{props.nome_servico}</h2>
                <p>{props.desc_servico}</p>
                <img src={props.img_servico} alt="Imagem do Serviço" />
                <span>Ver mais</span>
            </a>
      </div>
    );
  }

export default Servico;
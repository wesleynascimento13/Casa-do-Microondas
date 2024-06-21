import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/styles.css';

function Servicos() {

  useEffect(() => {
    const servicosSection = document.getElementById('servicos');
    if (servicosSection) {
        servicosSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const [servicos, setServicos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/servicos')
            .then(response => {
                console.log(response.data); // Verifica os dados recebidos no console
                setServicos(response.data); // Atualiza o estado com os serviços recebidos
            })
            .catch(error => {
                console.error('Erro ao carregar serviços:', error);
                // Tratar erro, por exemplo, exibir uma mensagem de erro na UI
            });
    }, []); // O segundo argumento [] indica que o useEffect será executado apenas uma vez

    return (
      <div id='servicos'>
        <h1>Serviços Disponíveis</h1>
          <ul className='product-container'>
              {servicos.map(servico => (
                  <li key={servico.id_servico}>
                      <a href={servico.url_servico} target="_blank" rel="noopener noreferrer">
                          <div className="servico-item">
                              <h3>{servico.titulo_servico}</h3>
                              <p>{servico.desc_servico}</p>
                              <img src={servico.img_servico} alt={servico.titulo_servico} />
                          </div>
                      </a>
                  </li>
              ))}
          </ul>
      </div>
    );
}
export default Servicos;
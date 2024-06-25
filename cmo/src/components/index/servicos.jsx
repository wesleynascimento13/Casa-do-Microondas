import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';



function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/servicos')
            .then((res) => {
                setServicos(res.data);
                setIsLoaded(true); // Dados carregados
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const handleServiceClick = (id) => {
        navigate(`/servico/${id}`);
    };

    
    return (
        <div id='servicos'>
            <h1>Serviços Disponíveis</h1>
            {!isLoaded && <div className="placeholder"></div>} {/* Div invisível */}
            <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
                <ul className='product-container'>
                    {servicos.map(servico => (
                        <li key={servico.id_servico} onClick={() => handleServiceClick(servico.id_servico)}>
                            <div>
                                <div className="servico-item">
                                    <h3>{servico.titulo_servico}</h3>
                                    <p>{servico.desc_servico}</p>
                                    {servico.imagem && <img src={require(`.${servico.imagem}`).default} alt={servico.titulo_servico} />}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Servicos;
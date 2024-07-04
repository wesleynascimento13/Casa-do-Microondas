import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../utils/loginout';
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
        if (!isUserLoggedIn()) {
            navigate('/login');
        } else {
            navigate(`/servico/${id}`);
        }
    };

    
    return (
        <div id='servicos'>
            <h1 className='centralizado'>Serviços Disponíveis</h1>
            <img src="/Imagens/retangulo_laranja.png" alt="retangulo laranja" width="75" height="4" class="imagem-centralizada"></img>
            {!isLoaded && <div className="placeholder"></div>} {/* Div invisível */}
            <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
                <ul className='product-container'>
                    {servicos.map(servico => (
                        <li key={servico.id_servico} onClick={() => handleServiceClick(servico.id_servico)} className="servico1-container service-image ">
                            <div >
                            <img src={process.env.PUBLIC_URL + "/Imagens/Imagem de fundo serviços.png"} alt="conserto de microondas" className="servico1-image" />
                            <img src={process.env.PUBLIC_URL + `/Imagens/${servico.img_servico}`} alt={servico.titulo_servico} width="192" height="108" className="second-image" />
                                <div>                         
                                   
                                   {/* {servico.img_servico && <img src={require(`.${servico.img_servico}`).default} alt={servico.titulo_servico} class="second-image" width="192" height="108"/>}*/}
                                
                                    <h2 servico1-text_1 className='servico1-text_1'>{servico.titulo_servico}</h2>
                                    <p servico1-text_2 className='servico1-text_2'>{servico.desc_servico}</p>  
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
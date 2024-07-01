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
            {!isLoaded && <div className="placeholder"></div>} {/* Div invisível */}
            <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
                <ul className='product-container'>
                    {servicos.map(servico => (
                        <li key={servico.id_servico} onClick={() => handleServiceClick(servico.id_servico)} className="servico1-container service-image ">
                            <div >
                            <img src={require("../../Imagens/Imagem de fundo serviços.png")} alt="conserto de microondas" className=" servico1-image"></img>
                            <img src={require("../../Imagens/servico1.png")} alt="conserto de microondas" width="192" height="108" className='servico1'></img>
                                <div className='service'>                         
                                   
                                   {/* {servico.img_servico && <img src={require(`.${servico.img_servico}`).default} alt={servico.titulo_servico} class="second-image" width="192" height="108"/>}*/}
                                
                                    <h3 servico1-text_1>{servico.titulo_servico}</h3>
                                    <p servico1-text_2>{servico.desc_servico}</p>  
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
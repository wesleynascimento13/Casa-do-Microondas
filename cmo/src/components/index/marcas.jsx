import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function Marca(props) {
    const [marcas, setMarcas] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/marcas')
            .then((res) => {
                setMarcas(res.data);
                setIsLoaded(true); // Dados carregados
            })
            .catch((err) => {
                alert('Erro ao carregar marcas');
                console.error(err);
            });
    }, []);

    // Função para verificar se a imagem existe
    const imageExists = (url) => {
        const img = new Image();
        img.src = url;
        return img.complete || img.width + img.height > 0;
    };

    return (

        <section  id="marcas">
            <h2 className="centralizado" id="saiba_mais">Marcas Licenciadas</h2>
            
            <img src={require('../../Imagens/retangulo_laranja.png')} alt="retangulo laranja" width="75" height="4" className="imagem-centralizada" />
        
        
                <div id="marcas_licenciadas " className="marcas_licenciadas centralizado">
                    <img src={require('../../Imagens/logo brastemp.png')} alt="Brastemp" width="162" height="92" />
                    <img src={require('../../Imagens/consul logo.png')} alt="Consul" width="162" height="92" />
                    <img src={require('../../Imagens/philco logo.png')} alt="Philco" width="162" height="92" />
                    <img src={require('../../Imagens/LG logo.png')} alt="LG" width="162" height="92" />
                    <img src={require('../../Imagens/eletrolux logo.png')} alt="Electrolux" width="162" height="92" />
                    <img src={require('../../Imagens/panasonic logo.png')} alt="Panasonic" width="162" height="92" />
                    <img src={require('../../Imagens/samsung logo.png')} alt="Samsung" width="162" height="92" />
            
        
                </div>
      </section>


        
    );
}

export default Marca;

{/*
        <div id='marcas'>
            <h1 className='centralizado'>Marcas</h1>
            {!isLoaded && <div className="placeholder"></div>} 
            <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
                <ul className='product-container'>
                    {marcas.map(marca => (
                        <li key={marca.id_marca}>
                            <div>
                                <div className="servico-item">
                                   
                                    {marca.logo_marca && imageExists(marca.logo_marca) ? (
                                        <img src={marca.logo_marca} alt={marca.desc_marca} />
                                    ) : (
                                        <p>{marca.desc_marca}</p>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>*/}
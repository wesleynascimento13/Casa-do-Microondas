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
        <div id='marcas'>
            <h1>Marcas</h1>
            {!isLoaded && <div className="placeholder"></div>} {/* Div invisível */}
            <div className={`fade-in ${isLoaded ? 'show' : ''}`}>
                <ul className='product-container'>
                    {marcas.map(marca => (
                        <li key={marca.id_marca}>
                            <div>
                                <div className="servico-item">
                                    {/* Verifica se a imagem existe antes de renderizá-la */}
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
        </div>
    );
}

export default Marca;
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import '../../styles/styles.css';

function Marca(props) {
    const [marcas, setMarcas] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadedMarcas, setLoadedMarcas] = useState([]);

    const imageExists = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    };

    useEffect(() => {
        api.get('/marcas')
            .then(async (res) => {
                const marcas = res.data;

                // Verifica se as imagens existem
                const marcasComImagens = await Promise.all(
                    marcas.map(async (marca) => {
                        const logoUrl = process.env.PUBLIC_URL + `/Imagens/${marca.logo_marca}`;
                        const exists = await imageExists(logoUrl);
                        return { ...marca, logoExists: exists };
                    })
                );

                setMarcas(marcasComImagens);
                setIsLoaded(true); // Dados carregados
            })
            .catch((err) => {
                alert('Erro ao carregar marcas');
                console.error(err);
            });
    }, []);

    return (
        <div id='marcas'>
            <h1 className='centralizado'>Marcas</h1>
            <img src="/Imagens/retangulo_laranja.png" alt="retangulo laranja" width="75" height="4" className="imagem-centralizada"></img>
            {!isLoaded && <div className="placeholder"></div>}
            <div className={`fade-in ${isLoaded ? 'show' : ''} marcas-container`}>
                <div className='product-container'>
                    {marcas.map(marca => (
                        <div key={marca.id_marca}>
                            <div>
                                <div className="servico-item">
                                    {marca.logoExists ? (
                                        <img src={process.env.PUBLIC_URL + `/Imagens/${marca.logo_marca}`} alt={marca.desc_marca} width="162" height="92" />
                                    ) : (
                                        <div className="placeholder-image">Imagem não disponível</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Marca;


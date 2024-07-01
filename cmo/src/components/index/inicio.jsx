import React from 'react';
import { Link } from 'react-router-dom'; 
import '../../styles/styles.css';


function Inicio(props) {

  return (
    <section id="capa">
        <div className="image-container" id="inicio">
            {/* Imagem de fundo */}
            <div className="imagem-logo">
                <img src={props.fundo} alt="imagem laranja" className="responsive-image desktop-image" />
                {/*<img src={props.fundo_celular} alt="imagem laranja para celular" className="responsive-image mobile-image" />*/}
            </div>
            <div className="image-text">
                {/* Título */}
                <span className="highlight-text"><strong>{props.marca}</strong></span><br />
                <img src={props.url2} alt="imagem preta" width="75" height="4" style={{ marginBottom: '50px', marginTop: '20px' }} /><br />
                {/* redes sociais */}
                <div className="link_transparente redes-sociais">
                    <Link to={props.instagram_url} className="social-icon">
                        <img src={props.instagram_img} alt="icone instagram" className="icone" />
                    </Link>
                    <Link to={props.facebook_url} className="social-icon">
                        <img src={props.facebook_img} alt="icone facebook" className="icone" />
                    </Link>
                    <Link to={props.whatsapp_url} className="social-icon">
                        <img src={props.whatsapp_img} alt="icone whatsapp" className="icone" />
                    </Link>
                </div>
                {/* Frase inicial da loja */}
                <p className="tamanho_fonte_1" style={{ marginBottom: '-30px' }}><strong>{props.descricao}</strong></p><br />
                {/* Botão */}
                <div className="container-botão">
                    <div className="center">
                        <Link to={props.href1}>
                            <button className="btn">
                                <svg width="100%" height="100%" viewBox="0 0 280 60" className="border">
                                    <polyline points="279,1 279,59 2,59 1,1" className="bg-line" />
                                    <polyline points="279,1 279,59 2,59 1,1" className="hl-line" />
                                </svg>
                                <span className='btn-c'>{props.botao_inicio_1}</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>
    );
  }
export default Inicio;

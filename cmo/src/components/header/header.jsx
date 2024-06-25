import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css';

function Header(props) {
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionId, offset = 0) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const topPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        }
    };

    const handleInicioClick = (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(scrollToTop, 0);
        } else {
            scrollToTop();
        }
    };

    const handleServicosClick = (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => scrollToSection('servicos', 100), 0);
        } else {
            setTimeout(() => scrollToSection('servicos', 100), 100);
        }
    };

    const handleContatoClick = (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => scrollToSection('contato', 100), 0);
        } else {
            scrollToSection('contato', 100);
        }
    };

    const handleLocalizacaoClick = (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => scrollToSection('localizacao', 140), 0);
        } else {
            scrollToSection('localizacao', 140);
        }
    };

    return (
        <header>
            <div className="container">
                <div className="site-name">
                    <h1>| {props.marca} |</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="/" onClick={handleInicioClick}>Início</a>
                        </li>
                        <li>
                            <a href="/" onClick={handleServicosClick}>Serviços</a>
                        </li>
                        <li>
                            <a href="/" onClick={handleContatoClick}>Contato</a>
                        </li>
                        <li>
                            <a href="/" onClick={handleLocalizacaoClick}>Localização</a>
                        </li>
                        <li>
                            <a href={props.pag_conta_cliente}>Acessar Conta</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;

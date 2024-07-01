import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css';

function GestaoADM(props) {
    const navigate = useNavigate();

    // Verifica a permissão ao carregar a página
    useEffect(() => {
        const permissao = localStorage.getItem('permissao');

        // Se não tiver permissão de adm, redireciona para outra página (ou faz outro tratamento)
        if (permissao !== 'adm') {
            navigate('/'); // Redireciona para a página inicial
        }
    }, [navigate]);
/*
    const redirectTo = (path) => {
        navigate(`/${path}`);
    };
*/
    return (
        <div className="container-adm centralizado">
            <h1>Gestão</h1>
            <div className="buttons-container">
                <Link to={props.chamados_link} className="button-link">Chamados</Link>
                <Link to={props.usuarios_link} className="button-link">Usuários</Link>
                <Link to="/produto" className="button-link">Produto</Link>
                <Link to="/tipo_produto" className="button-link">Tipos de Produto</Link>
                <Link to="/servicos" className="button-link">Serviços</Link>
                <Link to="/marcas" className="button-link">Marcas</Link>
                <Link to="/contatos" className="button-link">Contato</Link>
                <Link to="/entregas" className="button-link">Entrega</Link>
            </div>
        </div>
    );
}

export default GestaoADM;
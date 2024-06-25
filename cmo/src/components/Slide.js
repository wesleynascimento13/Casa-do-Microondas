// import { useEffect, useState } from 'react';
// import api from '../api/api.js';


// function Slide() {
//     const [servicos, setServicos] = useState([]);

//     useEffect(() => {
//         api.get('/servicos')
//             .then((res) => {
//                 setServicos(res.data);
//             })
//             .catch((err) => {
//                 alert(err);
//             });
//     }, []);

/*
import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import api from '../../api/api';
import '../../styles/styles.css';

function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        api.get('/servicos')
            .then((res) => {
                setServicos(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    return (
        <div id='servicos'>
            <h1>Serviços Disponíveis</h1>
            <TransitionGroup component="ul" className="servicos-container product-container">
                {servicos.map(servico => (
                    <CSSTransition
                        key={servico.id_servico}
                        timeout={500}
                        classNames="fade"
                    >
                        <li className="servico-item">
                            <a href={servico.url_servico} target="_blank" rel="noopener noreferrer">
                                <div>
                                    <h3>{servico.titulo_servico}</h3>
                                    <p>{servico.desc_servico}</p>
                                    <img src={servico.img_servico} alt={servico.titulo_servico} />
                                </div>
                            </a>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
}

export default Servicos;

*/
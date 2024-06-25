import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function Chamado() {
    const { id } = useParams();
    const [servico, setServico] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching service details for ID:", id); // Log do ID
        api.get(`/servicos/${id}`)
            .then((res) => {
                console.log("Service details received:", res.data); // Log dos dados recebidos
                if (res.data) {
                    setServico(res.data);
                } else {
                    setError('Serviço não encontrado');
                }
            })
            .catch((err) => {
                console.error("Error fetching service details:", err); // Log do erro
                setError(err.message);
                alert('Erro ao carregar os dados do serviço');
            });
    }, [id]);

    if (error) {
        return <div>Erro: {error}</div>;
    }

    if (!servico) {
        return <div>Carregando...</div>;
    }

    return (
        
        <div className="chamados-form-container">
            {/* Título do serviço */}
            <div className="chamados-form-group">
                <h1 className="chamados-titulo-servico">{servico.titulo_servico}</h1>
            </div>

            {/* Descrição do serviço */}
            <div className="chamados-form-group">
                <p className="chamados-descricao-servico">{servico.desc_servico}</p>
            </div>

            {/* Formulário */}
            <form action="#" method="post">
                {/* Campo de seleção da marca do microondas */}
                <div className="chamados-form-group">
                    <label htmlFor="marca">Marca</label>
                    <select id="marca" name="marca" className="chamados-input" required>
                        <option value="marca1">Brastemp</option>
                        <option value="marca2">Consul</option>
                        <option value="marca3">Philco</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>

                {/* Campo de especificação de outra marca (invisível por padrão) */}
                <div className="chamados-form-group chamados-outros-marca" style={{ display: 'none' }}>
                    <label htmlFor="outra-marca">Especifique a Marca</label>
                    <input type="text" id="outra-marca" name="outra-marca" className="chamados-input" />
                </div>

                {/* Campo de descrição do problema */}
                <div className="chamados-form-group">
                    <label htmlFor="descricao-problema">Descrição do Problema</label>
                    <textarea id="descricao-problema" name="descricao-problema" className="chamados-input" rows="4" required></textarea>
                </div>

                {/* Checkbox para entrega */}
                <div className="chamados-form-group">
                    <label htmlFor="entrega">Busca e Entrega</label>
                    <input type="checkbox" id="entrega" name="entrega" className="chamados-checkbox" />
                </div>

                {/* Botão de envio */}
                <button type="submit" className="chamados-submit-button">Enviar</button>
            </form>
        </div>
  
    );
}

export default Chamado;

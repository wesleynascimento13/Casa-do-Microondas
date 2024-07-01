import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function Chamado() {
    const location = useLocation();
    const { id } = useParams();
    const [servico, setServico] = useState(null);
    const [marcas, setMarcas] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        marca: '',
        descricaoProblema: '',
        entrega: 'nao'  // Inicializa com 'nao' selecionado
    });

    const fetchDados = useCallback(() => {
        const token = localStorage.getItem('token');
        const idCliente = localStorage.getItem('idCliente');

        api.get(`/servicos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (res.data) {
                setServico(res.data);
                // Atualizar formData para refletir a mudança
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    tipo_id: res.data.tipo_id  // Ajuste conforme a estrutura do seu objeto de serviço
                }));
            } else {
                setError('Serviço não encontrado');
            }
        })
        .catch((err) => {
            console.error("Error fetching service details:", err);
            setError('Erro ao carregar os dados do serviço');
        });

        api.get('/marcas')
            .then((res) => {
                setMarcas(res.data);
            })
            .catch((err) => {
                console.error("Error fetching marcas:", err);
                setError('Erro ao carregar as marcas');
            });
    }, [id]);

    useEffect(() => {
        fetchDados();
    }, [location, fetchDados]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const idCliente = localStorage.getItem('idCliente');

        const data = {
            id_cliente: idCliente,
            desc_chamado: formData.descricaoProblema,
            tipo_desc: servico.id_tipo,
            marca: formData.marca,
            entrega: formData.entrega === 'sim'  // Converte para booleano
        };

        api.post('/chamados', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            console.log("Chamado inserido:", res.data);
            alert('Chamado inserido com sucesso!');
            // Redirecionar ou realizar outra ação após inserção
            // Exemplo de redirecionamento:
            // history.push('/outra-rota');
        })
        .catch((err) => {
            console.error("Erro ao inserir chamado:", err);
            alert('Erro ao inserir chamado');
        });
    };

    if (error) {
        return <div>Erro: {error}</div>;
    }

    if (!servico) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="chamados-form-container">
            <div className="chamados-form-group">
                <h1 className="chamados-titulo-servico">{servico.titulo_servico}</h1>
            </div>
            <div className="chamados-form-group">
                <p className="chamados-descricao-servico">{servico.desc_servico}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="chamados-form-group">
                    <label htmlFor="marca">Marca</label>
                    <select
                        id="marca"
                        name="marca"
                        className="chamados-input"
                        required
                        value={formData.marca}
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma marca</option>
                        {marcas.map((marca) => (
                            <option key={marca.id_marca} value={marca.desc_marca}>
                                {marca.desc_marca}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="chamados-form-group">
                    <label htmlFor="descricaoProblema">Descrição do Problema</label>
                    <textarea
                        id="descricaoProblema"
                        name="descricaoProblema"
                        className="chamados-input"
                        rows="4"
                        required
                        value={formData.descricaoProblema}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="chamados-form-group" style={{ marginBottom: '1em' }}>
                    <label style={{ display: 'block' }}>Deseja busca e entrega?</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="radio"
                            id="entrega-sim"
                            name="entrega"
                            value="sim"
                            style={{ marginRight: '5px' }}
                            checked={formData.entrega === 'sim'}
                            onChange={handleChange}
                        />
                        <label htmlFor="entrega-sim" style={{ marginRight: '10px' }}>Sim</label>
                        <input
                            type="radio"
                            id="entrega-nao"
                            name="entrega"
                            value="nao"
                            style={{ marginRight: '5px' }}
                            checked={formData.entrega === 'nao'}
                            onChange={handleChange}
                        />
                        <label htmlFor="entrega-nao">Não</label>
                    </div>
                </div>
                <button type="submit" className="chamados-submit-button">Enviar</button>
            </form>
        </div>
    );
}

export default Chamado;

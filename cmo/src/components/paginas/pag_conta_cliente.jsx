import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/api';
import { isUserLoggedIn, logout } from '../../utils/loginout';
import '../../styles/styles.css';

function ContaCliente() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        if (!isUserLoggedIn()) {
            navigate('/login');
        } else {
            fetchCliente();
        }
    }, [navigate, location]);

    const fetchCliente = async () => {
        try {
            const token = localStorage.getItem('token');
            const idCliente = localStorage.getItem('idCliente');
            console.log('Token recuperado:', token); // Log para verificar o token recuperado
            console.log('id recuperado:', idCliente);

            const response = await api.get(`/cliente/${idCliente}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Dados do cliente:', response.data); // Log para verificar os dados do cliente

            setCliente(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar informações do cliente:', error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleEdit = () => {
        setIsEditing(true); // Ativar modo de edição
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const idCliente = localStorage.getItem('idCliente');
            console.log('Salvando dados do cliente:', cliente); // Log para verificar os dados do cliente
            setModalMessage('Dados Salvos!');
    
            await api.put(`/cliente/${idCliente}`, {
                nome_cliente: cliente.nome_cliente,
                email_cliente: cliente.email_cliente,
                fone_cliente: cliente.fone_cliente,
                endereco_cliente: cliente.endereco_cliente,
                senha_cliente: cliente.senha_cliente || '', // Garantir que senha_cliente seja enviada mesmo se vazio
                oper: "u",
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setIsEditing(false); // Desativar modo de edição após salvar
        } catch (error) {
            console.error('Erro ao salvar informações do cliente:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const idCliente = localStorage.getItem('idCliente');
            console.log('apagando dados do cliente:', cliente); // Log para verificar os dados do cliente
    
            await api.put(`/cliente/${idCliente}`, {
                nome_cliente: cliente.nome_cliente,
                email_cliente: cliente.email_cliente,
                fone_cliente: cliente.fone_cliente,
                endereco_cliente: cliente.endereco_cliente,
                senha_cliente: cliente.senha_cliente || '', // Garantir que senha_cliente seja enviada mesmo se vazio
                oper: "d",
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Após a exclusão, realizar logout
            logout();
            navigate('/');
        } catch (error) {
            console.error('Erro ao excluir conta do cliente:', error);
        }
    };

    if (loading) {
        return <div>Carregando informações do cliente...</div>;
    }

    if (!isUserLoggedIn()) {
        return <div>Você precisa estar logado para acessar esta página</div>;
    }

    return (
        <div className="acesso-conta-container">
            {!cliente ? (
                <div>Erro ao carregar informações do cliente.</div>
            ) : (
                <div>
                    <div className="acesso-conta-account-info">
                        <div className="form-group">
                            <label htmlFor="fullName">Nome Completo:</label>
                            <input type="text" id="fullName" disabled={!isEditing} value={cliente.nome_cliente} onChange={(e) => setCliente({ ...cliente, nome_cliente: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" id="email" disabled={!isEditing} value={cliente.email_cliente} onChange={(e) => setCliente({ ...cliente, email_cliente: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Telefone:</label>
                            <input type="tel" id="phone" disabled={!isEditing} value={cliente.fone_cliente} onChange={(e) => setCliente({ ...cliente, fone_cliente: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Endereço Completo:</label>
                            <input type="text" id="address" disabled={!isEditing} value={cliente.endereco_cliente} onChange={(e) => setCliente({ ...cliente, endereco_cliente: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha:</label>
                            <input type="password" id="password" disabled={!isEditing} value={cliente.senha_cliente || ''} onChange={(e) => setCliente({ ...cliente, senha_cliente: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status de Serviços Abertos:</label>
                            <input type="text" id="status" disabled value={cliente.status_chamado_ativo} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="history">Histórico de Serviços:</label>
                            <textarea id="history" rows="4" disabled value={cliente.historico_chamados}></textarea>
                        </div>
                    </div>
                    <div className="acesso-conta-header">
                        {!isEditing ? (
                            <button id="btnEdit" onClick={handleEdit}>Editar Informações</button>
                        ) : (
                            <button id="btnSave" onClick={handleSave}>Salvar Informações</button>
                        )}
                        {isEditing && (
                            <button id="btnDelete" onClick={handleDeleteAccount}>Excluir Conta</button>
                        )}
                        <button id="btnLogout" onClick={handleLogout}>Sair da Conta</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContaCliente;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function ContatoCrud() {
    const navigate = useNavigate();
    const [contatos, setContatos] = useState([]);
    const [setErro] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [editandoContato, setEditandoContato] = useState(null);
    const [contatoIdToDelete, setContatoIdToDelete] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [formData, setFormData] = useState({
        id:1,
        id_clien:'',
        assunto:'',
        mensagem:'',
        resposta:'Aguardando Resposta...',
        oper:'u',

    });

    useEffect(() => {
        const permissao = localStorage.getItem('permissao');
        if (permissao !== 'adm') {
            navigate('/'); 
        } else {
            fetchContatos();
            fetchClientes();
        }
    }, [navigate]);
  
    const fetchContatos = async () => {
        try {
            const response = await api.get('/admcontatos');
            setContatos(response.data);
        } catch (error) {
            console.error("Erro ao buscar contatos:", error);
            setErro("Erro ao buscar contatos. Tente novamente mais tarde.");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value
        });
      };

    const fetchClientes = async () => {
    try {
        const response = await api.get('/admCliente');
        setClientes(response.data);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        setErro("Erro ao buscar clientes. Tente novamente mais tarde.");
    }
    };

    // post

    const handleAdicionarClick = () => {
        setShowModal(true); 
    };

    const handleSalvarContato = async () => {
        // Verificar se todos os campos estão preenchidos
        for (const key in formData) {
            if (formData[key] === '' || formData[key] === null) {
            alert('Por favor, preencha todos os campos.');
            return;
            }
        }

        try {
            const token = localStorage.getItem('token'); // Exemplo: Recupere o token de onde você o armazenou
            const response = await api.post('/contatos', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Contato adicionado com sucesso!');
            setShowModal(false); 
            fetchContatos(); 

            // Limpar os campos do formulário
            setFormData({
                id:1,
                id_clien:'',
                assunto:'',
                mensagem:'',
                resposta:'',
                oper:'u',
            });

        } catch (err) {
            console.error("Erro ao adicionar contato:", err);
            alert('Erro ao adicionar contato. Verifique os dados e tente novamente.');
        }
    };

    const handleCancelarClick = () => {
        setShowModal(false);

        setFormData({
            id:1,
            id_clien:'',
            assunto:'',
            mensagem:'',
            resposta:'',
            oper:'u',
        });
    };

    
    // put

    const handleEditClick = (contato) => {
        
        setFormData({
            id: contato.id_contato,
            id_clien: contato.id_cliente,
            assunto: contato.assunto,
            mensagem: contato.mensagem,
            resposta: contato.resposta,
            oper:'u',
        });
        setEditandoContato(contato.id_contato); 
        setShowEditModal(true); // Abrir o modal de edição
        };

    const handleUpdateContato = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Incluir o id_chamado no formData
            formData.id_contato = editandoContato;

            const response = await api.put(`/contatos`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Contato atualizado com sucesso!');
            setShowEditModal(false);
            fetchContatos();

            setFormData({
                id:1,
                id_clien:'',
                assunto:'',
                mensagem:'',
                resposta:'',
                oper:'u',
            });
            

        } catch (err) {
            console.error("Erro ao atualizar contato:", err);
            alert('Erro ao atualizar contato. Verifique os dados e tente novamente.');
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false); // Fechar o modal ao clicar em Cancelar
        setFormData({
            id:1,
            id_clien:'',
            assunto:'',
            mensagem:'',
            resposta:'',
            oper:'u',
        });
    };

   // DELETE

    const handleExcluirContato = (id) => {
        setContatoIdToDelete(id);
        setShowDeleteModal(true); 
    };

    const confirmarExclusao = async () => {
        try {
            await api.put(`/contatos`, {
                id: contatoIdToDelete,
                oper: 'd'
            });

            console.log('Exclusão de contato bem-sucedida'); // Log de sucesso
            setShowDeleteModal(false);
            fetchContatos(); 

        } catch (error) {
            console.error('Erro ao excluir contato:', error); // Log de erro
            alert('Erro ao excluir contato. Verifique e tente novamente.');
        }
    };

    const cancelarExclusao = () => {
        setShowDeleteModal(false); // Fechar modal de confirmação de exclusão
    };

    


    return (
        <div className="adm_container">
            <h2 className="adm_title">Contatos</h2>
            <button className="adm_add_btn" onClick={handleAdicionarClick}>Adicionar</button>

            <div className="adm_table_container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Assunto</th>
                            <th>Mensagem</th>
                            <th>Data Contato</th>
                            <th>Resposta</th>
                            <th>Data Resposta</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contatos.map(contato => (
                            
                            <tr key={contato.id_contato}>
                                <td>{contato.id_contato}</td>
                                <td>{`${contato.id_cliente}: ${clientes.find(cliente => cliente.id_cliente === contato.id_cliente)?.nome_cliente}`}</td>
                                <td>{contato.assunto}</td>
                                <td>{contato.mensagem}</td>
                                <td>{new Date(contato.dt_contato).toLocaleDateString()}</td>
                                <td>{contato.resposta}</td>
                                <td>{contato.dt_resposta ? new Date(contato.dt_resposta).toLocaleDateString() : ''}</td>
                                <td>
                                    <button className="adm_edit_btn"  onClick={() => handleEditClick(contato)}>Editar</button>
                                    <button className="adm_delete_btn" onClick={() => handleExcluirContato(contato.id_contato)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>

            {showModal && (

            <div className="modal">
                <div className="modal-content">
                    <h2>Adicionar Contato</h2>
                    <form>
                        <select id="id_clien" name="id_clien" className="chamados-input" value={formData.id_clien} onChange={handleChange} required>
                            <option value="">Selecione um cliente</option>
                            {clientes.map(cliente => (
                            <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                {cliente.id_cliente}: {cliente.nome_cliente}
                            </option>
                            ))}
                        </select>

                        <label>Assunto:</label>
                        <input type="text" id='assunto' name='assunto' value={formData.assunto} onChange={handleChange} required />

                        <label>Mensagem:</label>
                        <input type="text" id='mensagem' name='mensagem' value={formData.mensagem} onChange={handleChange} required />

                        <div className="modal-buttons">
                            <button type="button" onClick={handleSalvarContato}>Salvar</button>
                            <button type="button" onClick={handleCancelarClick}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
            )}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                    <h2>Editar Contato</h2>
                    <form>
                        <select id="id_clien" name="id_clien" className="chamados-input" value={formData.id_clien} onChange={handleChange} required>
                            <option value="">Selecione um cliente</option>
                            {clientes.map(cliente => (
                            <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                {cliente.id_cliente}: {cliente.nome_cliente}
                            </option>
                            ))}
                        </select>
                        
                        <label>Assunto:</label>
                        <input type="text" id='assunto' name='assunto' value={formData.assunto} onChange={handleChange} required />

                        <label>Mensagem:</label>
                        <input type="text" id='mensagem' name='mensagem' value={formData.mensagem} onChange={handleChange} required />

                        <label>Resposta:</label>
                        <input type="text" id='resposta' name='resposta' value={formData.resposta} onChange={handleChange} required />

                        <div className="modal-buttons">
                                <button type="button" onClick={handleUpdateContato}>Salvar</button>
                                <button type="button" onClick={handleCloseModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="modal">
                    {/* Modal de Confirmação de Exclusão */}
                    <div className="modal-content">
                        <h2>Confirmar Exclusão (PERMANENTE)</h2>
                        <p>Deseja realmente excluir o contato {contatoIdToDelete}?</p>
                        <div className="modal-buttons">
                            <button type="button" onClick={confirmarExclusao}>Excluir</button>
                            <button type="button" onClick={cancelarExclusao}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}

export default ContatoCrud;

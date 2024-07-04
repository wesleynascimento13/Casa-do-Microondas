import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';


function EntregasCrud() {
    const navigate = useNavigate();
    const [entregas, setEntregas] = useState([]);
    const [setErro] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [Chamados, setChamados] = useState([]);
    const [editandoEntrega, setEditandoEntrega] = useState(null);
    const [entregaIdToDelete, setEntregaIdToDelete] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [formData, setFormData] = useState({
        id_entrega: 1,
        id_chamado: 1,
        endereco: 'adicionar endereço...',
        status: 'Aberto',
        oper: 'u'
    });

    useEffect(() => {
        const permissao = localStorage.getItem('permissao');
        if (permissao !== 'adm') {
            navigate('/'); 
        } else {
            fetchEntregas();
            fetchClientes();
            fetchChamados();
        }
    }, [navigate]);
  
    const fetchEntregas = async () => {
        try {
            const response = await api.get('/admentregas');
            setEntregas(response.data);
        } catch (error) {
            console.error("Erro ao buscar entregas:", error);
            setErro("Erro ao buscar entregas. Tente novamente mais tarde.");
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

        const fetchChamados = async () => {
            try {
                const response = await api.get('/admchamados');
                setChamados(response.data);
            } catch (error) {
                console.error("Erro ao buscar chamados:", error);
                setErro("Erro ao buscar chamados. Tente novamente mais tarde.");
            }
        };

    // post

    const handleAdicionarClick = () => {
        setShowModal(true); 
    };

    // Função para selecionar o chamado e setar o ID do cliente
    const handleSelecionarChamado = (idChamado, idCliente) => {
        setFormData({
            ...formData,
            id_chamado: idChamado,
            id_cliente: idCliente
        });
        setShowModal(true);
    };

    const handleSalvarEntrega = async () => {
        // Verificar se todos os campos estão preenchidos
        for (const key in formData) {
          if (formData[key] === '' || formData[key] === null) {
            alert('Por favor, preencha todos os campos.');
            return;
          }
        }
      
        try {
          // Obter o id_cliente associado ao id_chamado selecionado
          const idChamadoSelecionado = formData.id_chamado;
          const chamadoSelecionado = Chamados.find(chamado => chamado.id_chamado === idChamadoSelecionado);
          const idClienteChamado = chamadoSelecionado.id_cliente;
      
          const token = localStorage.getItem('token');
          const response = await api.post('/entregas', {
            ...formData,
            id_cliente: idClienteChamado  // Definir o id_cliente associado ao chamado
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          console.log(response.data);
          alert('Entrega adicionada com sucesso!');
          setShowModal(false);
          fetchEntregas();
      
          // Limpar os campos do formulário
          setFormData({
            id_entrega: 1,
            id_chamado: 1,
            endereco: '',
            status: '',
            oper: 'u'
          });
      
        } catch (err) {
          console.error("Erro ao adicionar entrega:", err);
          alert('Erro ao adicionar entrega. Verifique os dados e tente novamente.');
        }
      };

    const handleCancelarClick = () => {
        setShowModal(false);

        setFormData({
            id_entrega: 1,
            id_chamado: 1,
            endereco: '',
            status: '',
            oper: 'u'
        });
    };

   // put

   const handleEditClick = (entrega) => {
        
    setFormData({
            id_entrega: entrega.id_entrega,
            id_chamado: entrega.id_chamado,
            id_cliente: entrega.id_cliente,
            endereco: entrega.endereco,
            status: entrega.status,
            oper: 'u'
        });
        setEditandoEntrega(entrega.id_entrega); 
        setShowEditModal(true); // Abrir o modal de edição
        };

    const handleUpdateEntrega = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Incluir o id_chamado no formData
            formData.id_entrega = editandoEntrega;

            const response = await api.put(`/entregas`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Entrega atualizada com sucesso!');
            setShowEditModal(false);
            fetchEntregas();

            setFormData({
                id_entrega: 1,
                id_chamado: 1,
                endereco: '',
                status: '',
                oper: 'u'
            });
        

        } catch (err) {
            console.error("Erro ao atualizar entrega:", err);
            alert('Erro ao atualizar entrega. Verifique os dados e tente novamente.');
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false); // Fechar o modal ao clicar em Cancelar
        setFormData({
            id_entrega: 1,
            id_chamado: 1,
            endereco: '',
            status: '',
            oper: 'u'
        });
    };

    // DELETE

    const handleExcluirEntrega = (id) => {
        setEntregaIdToDelete(id);
        setShowDeleteModal(true); 
    };
    
    const confirmarExclusao = async () => {
        try {
            await api.put(`/entregas`, {
                id_entrega: entregaIdToDelete,
                oper: 'd'
            });
    
            console.log('Exclusão de entrega bem-sucedida'); // Log de sucesso
            setShowDeleteModal(false);
            fetchEntregas(); 
    
        } catch (error) {
            console.error('Erro ao excluir entrega:', error); // Log de erro
            alert('Erro ao excluir entrega. Verifique e tente novamente.');
        }
    };
    
    const cancelarExclusao = () => {
        setShowDeleteModal(false); // Fechar modal de confirmação de exclusão
    };
        

    return (
        <div className="adm_container">
            <h2 className="adm_title">Entregas</h2>
            <button className="adm_add_btn" onClick={handleAdicionarClick}>Adicionar</button>

            <div className="adm_table_container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID Chamado</th>
                            <th>Cliente</th>
                            <th>Endereço</th>
                            <th>Status</th>
                            <th>Data Cadastro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entregas.map(entrega => (
                            <tr key={entrega.id_entrega}>
                                <td>{entrega.id_entrega}</td>
                                <td>{entrega.id_chamado}</td>
                                <td>{`${entrega.id_cliente}: ${clientes.find(cliente => cliente.id_cliente === entrega.id_cliente)?.nome_cliente}`}</td>
                                <td>{entrega.endereco}</td>
                                <td>{entrega.status}</td>
                                <td>{new Date(entrega.dt_entrega).toLocaleDateString()}</td>
                                <td>
                                    <button className="adm_edit_btn"  onClick={() => handleEditClick(entrega)}>Editar</button>
                                    <button className="adm_delete_btn"  onClick={() => handleExcluirEntrega(entrega.id_entrega)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adicionar Entrega</h2>
                        <form>
                        <label htmlFor="id_chamado">Selecione um Chamado:</label>
                        <select
                        id="id_chamado"
                        name="id_chamado"
                        className="chamados-input"
                        value={formData.id_chamado}
                        onChange={handleChange}
                        required
                        >
                        <option value="">Selecione um Chamado</option>
                        {Chamados.map((chamado) => (
                            <option key={chamado.id_chamado} value={chamado.id_chamado}>
                            {`Chamado: ${chamado.id_chamado} - Cliente: ${
                                clientes.find((cliente) => cliente.id_cliente === chamado.id_cliente)
                                ?.nome_cliente
                            }`}
                            </option>
                        ))}
                        </select>

                            <div className="modal-buttons">
                                <button type="button" onClick={handleSalvarEntrega}>Salvar</button>
                                <button type="button" onClick={handleCancelarClick}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                    <h2>Editar Entrega</h2>
                    <form>
                        <label>Endereco:</label>
                        <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required />
                        
                        <label>Status:</label>
                        <input type="text" id='status' name='status' value={formData.status} onChange={handleChange} required />

                        <div className="modal-buttons">
                                <button type="button" onClick={handleUpdateEntrega}>Salvar</button>
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
                        <h2>Confirmar Exclusão PERMANENTE</h2>
                        <p>Deseja realmente excluir a entrega {entregaIdToDelete}? (não recomendado)</p>
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

export default EntregasCrud;

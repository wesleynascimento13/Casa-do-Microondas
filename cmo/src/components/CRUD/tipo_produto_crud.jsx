import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function TipoProdutoCrud() {
    const navigate = useNavigate();
    const [tipoProduto, settipoProduto] = useState([]);
    const [setErro] = useState(null);
    const [editandoTipo, setEditandoTipo] = useState(null);
    const [tipoIdToDelete, settipoIdToDelete] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [formData, setFormData] = useState({
        id: 1,
        tit: '',
        ativo: 1,
        oper: 'u',
    });

    useEffect(() => {
        const permissao = localStorage.getItem('permissao');
        if (permissao !== 'adm') {
            navigate('/'); 
        } else {
            fetchTipoProduto();
       
        }
    }, [navigate]);
  
    const fetchTipoProduto = async () => {
        try {
            const response = await api.get('/admTipoProduto');
            settipoProduto(response.data);
        } catch (error) {
            console.error("Erro ao buscar Tipos de produto:", error);
            setErro("Erro ao buscar Tipos de produto. Tente novamente mais tarde.");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value
        });
      };


  // post

    const handleAdicionarClick = () => {
        setShowModal(true); 
    };

    const handleSalvarTipo = async () => {
        // Verificar se todos os campos estão preenchidos
        for (const key in formData) {
            if (formData[key] === '' || formData[key] === null) {
            alert('Por favor, preencha todos os campos.');
            return;
            }
        }

        try {
            const token = localStorage.getItem('token'); // Exemplo: Recupere o token de onde você o armazenou
            const response = await api.post('/tipoproduto', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Tipo adicionado com sucesso!');
            setShowModal(false); 
            fetchTipoProduto(); 

            // Limpar os campos do formulário
            setFormData({
                id: '',
                tit: '',
                ativo: '',
                oper: '',
            });

        } catch (err) {
            console.error("Erro ao adicionar tipo:", err);
            alert('Erro ao adicionar tipo. Verifique os dados e tente novamente.');
        }
    };

    const handleCancelarClick = () => {
        setShowModal(false);

        setFormData({
            id: '',
            tit: '',
            ativo: '',
            oper: '',
        });
    };

    // put

    const handleEditClick = (tipo) => {
    

    
        // Preencher o formulário com os dados do chamado selecionado
        setFormData({
            id: tipo.id_tipo,
            tit: tipo.desc_tipo,
            ativo: tipo.ativo,
            oper: 'u',
        });
        setEditandoTipo(tipo.id_tipo); // Armazenar o ID do chamado sendo editado
        setShowEditModal(true); // Abrir o modal de edição
        };

    const handleUpdateTipo = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Incluir o id_chamado no formData
            formData.id_tipo = editandoTipo;

            const response = await api.put(`/tipoproduto`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Produto atualizado com sucesso!');
            setShowEditModal(false);
            fetchTipoProduto();

            setFormData({
                id: '',
                tit: '',
                ativo: '',
                oper: '',
            });
            

        } catch (err) {
            console.error("Erro ao atualizar tipo:", err);
            alert('Erro ao atualizar tipo. Verifique os dados e tente novamente.');
        }
        };

    const handleCloseModal = () => {
        setShowEditModal(false); // Fechar o modal ao clicar em Cancelar
        setFormData({
            id: '',
            tit: '',
            ativo: '',
            oper: '',
        });
    };

    // DELETE

    const handleExcluirTipo = (id) => {
        settipoIdToDelete(id);
        setShowDeleteModal(true); 
    };
  
    const confirmarExclusao = async () => {
        try {
            await api.put(`/tipoproduto`, {
                id: tipoIdToDelete,
                oper: 'd'
            });
      
            console.log('produto excluído com sucesso');
            setShowDeleteModal(false); 
            fetchTipoProduto(); 
        } catch (error) {
            console.error('Erro ao excluir tipo:', error);
            alert('Erro ao excluir tipo. Verifique e tente novamente.');
        }
    };
  
    const cancelarExclusao = () => {
        setShowDeleteModal(false); // Fechar modal de confirmação de exclusão
    };
  



    return (
            
        <div class="adm_container">
            <h2 class="adm_title">Tipos de Produto</h2>
            <button class="adm_add_btn" onClick={handleAdicionarClick}>Adicionar</button>

            <div class="adm_table_container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Ativo</th>
                            <th>Data Cadastro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tipoProduto.map(tipo => (
                            <tr key={tipo.id_tipo}>
                                <td>{tipo.id_tipo}</td>
                                <td>{tipo.desc_tipo}</td>
                                <td>{tipo.ativo ? 'Sim' : 'Não'}</td>
                                <td>{new Date(tipo.dt_cadastro).toLocaleDateString()}</td>
                                <td>
                                    <button class="adm_edit_btn" onClick={() => handleEditClick(tipo)}>Editar</button>
                                    <button class="adm_delete_btn" onClick={() => handleExcluirTipo(tipo.id_tipo)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adicionar Tipo de Produto</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" id='tit' name='tit' value={formData.tit} onChange={handleChange} required />
                            <div className="modal-buttons">
                                <button type="button" onClick={handleSalvarTipo}>Salvar</button>
                                <button type="button" onClick={handleCancelarClick}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                    <h2>Editar Tipo de Produto</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" id='tit' name='tit' value={formData.tit} onChange={handleChange} required />
                            <label>Ativo:</label>
                            <input type="checkbox" id="ativo" name="ativo" checked={formData.ativo} onChange={handleChange} />
                            <div className="modal-buttons">
                                <button type="button" onClick={handleUpdateTipo}>Salvar</button>
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
                            <h2>Confirmar Exclusão</h2>
                            <p>Deseja realmente excluir o Tipo{tipoIdToDelete}?</p>
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

export default TipoProdutoCrud;
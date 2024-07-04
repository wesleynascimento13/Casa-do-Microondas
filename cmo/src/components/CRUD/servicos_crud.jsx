import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function ServicosCrud() {
    const navigate = useNavigate();
    const [servicos, setServicos] = useState([]);
    const [tiposProduto, setTiposProduto] = useState([]);
    const [setErro] = useState(null);
    const [editandoServico, setEditandoServico] = useState(null);
    const [servicoIdToDelete, setServicoIdToDelete] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const [formData, setFormData] = useState({
        id_servico: 1, 
        tipo_id: '', 
        tit: '', 
        desc: '', 
        img: '', 
        ativo: 1, 
        oper: 'u',
    });

    useEffect(() => {
        const permissao = localStorage.getItem('permissao');
        if (permissao !== 'adm') {
            navigate('/');
        } else {
            fetchServicos();
            fetchTiposProduto();
        }
    }, [navigate]);

    const fetchServicos = async () => {
        try {
            const response = await api.get('/admservicos');
            setServicos(response.data);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
            setErro("Erro ao buscar serviços. Tente novamente mais tarde.");
        }
    };

    const fetchTiposProduto = async () => {
        try {
            const response = await api.get('/admTipoProduto');
            setTiposProduto(response.data);
        } catch (error) {
            console.error("Erro ao buscar tipos de produto:", error);
            setErro("Erro ao buscar tipos de produto. Tente novamente mais tarde.");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const getTipoProdutoDescricao = (id_tipo) => {
        const tipoProduto = tiposProduto.find(tipo => tipo.id_tipo === id_tipo);
        return tipoProduto ? tipoProduto.desc_tipo : 'Desconhecido';
    };


  // post

    const handleAdicionarClick = () => {
        setShowModal(true); 
    };

    const handleSalvarServico = async () => {
        console.log(formData)
        // Verificar se todos os campos estão preenchidos
        for (const key in formData) {
            if (formData[key] === '' || formData[key] === null) {
            alert('Por favor, preencha todos os campos.');
            return;
            }
        }

        try {
            const token = localStorage.getItem('token'); // Exemplo: Recupere o token de onde você o armazenou
            const response = await api.post('/servicos', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('serviço adicionado com sucesso!');
            setShowModal(false); 
            fetchServicos(); 

            // Limpar os campos do formulário
            setFormData({
                id_servico: 1, 
                tipo_id: '', 
                tit: '', 
                desc: '', 
                img: '', 
                ativo: 1, 
                oper: 'u',
            });

        } catch (err) {
            console.error("Erro ao adicionar chamado:", err);
            alert('Erro ao adicionar chamado. Verifique os dados e tente novamente.');
        }
    };

    const handleCancelarClick = () => {
        setShowModal(false);

        setFormData({
            id_servico: 1, 
            tipo_id: '', 
            tit: '', 
            desc: '', 
            img: '', 
            ativo: 1, 
            oper: 'u',
        });
    };

  // put

    const handleEditClick = (servico) => {
    
        setFormData({
            id_servico: servico.id_servico, 
            tipo_id: servico.id_tipo, 
            tit: servico.titulo_servico, 
            desc: servico.desc_servico, 
            img: servico.img_servico, 
            ativo: servico.ativo, 
            oper: 'u',
        });
        setEditandoServico(servico.id_servico); 
        setShowEditModal(true); // Abrir o modal de edição
        };

    const handleUpdateServico = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Incluir o id_chamado no formData
            formData.id_servico = editandoServico;

            const response = await api.put(`/servicos`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Servico atualizado com sucesso!');
            setShowEditModal(false);
            fetchServicos();

            setFormData({
                id_servico: 1, 
                tipo_id: '', 
                tit: '', 
                desc: '', 
                img: '', 
                ativo: 1, 
                oper: 'u',
            });
            

        } catch (err) {
            console.error("Erro ao atualizar servico:", err);
            alert('Erro ao atualizar servico. Verifique os dados e tente novamente.');
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false); // Fechar o modal ao clicar em Cancelar
        setFormData({
            id_servico: 1, 
            tipo_id: '', 
            tit: '', 
            desc: '', 
            img: '', 
            ativo: 1, 
            oper: 'u',
        });
    };

    // DELETE

    const handleExcluirServico = (id) => {
        setServicoIdToDelete(id);
        setShowDeleteModal(true); 
    };
    
    const confirmarExclusao = async () => {
        try {
            await api.put(`/servicos`, {
                id_servico: servicoIdToDelete,
                oper: 'd'
            });
        
            console.log('Serviço excluído com sucesso');
            setShowDeleteModal(false); 
            fetchServicos(); 
        } catch (error) {
            console.error('Erro ao excluir Serviço:', error);
            alert('Erro ao excluir Serviço. Verifique e tente novamente.');
        }
    };
    
    const cancelarExclusao = () => {
        setShowDeleteModal(false); // Fechar modal de confirmação de exclusão
    };
    


    return (
        <div className="adm_container">
            <h2 className="adm_title">Serviços</h2>
            <button className="adm_add_btn"  onClick={handleAdicionarClick}>Adicionar</button>

            <div className="adm_table_container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>        
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Tipo de Produto</th>
                            <th>Imagem Nome</th>
                            <th>Ativo</th>
                            <th>DATA CADASTRO</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map(servico => (
                            <tr key={servico.id_servico}>
                                <td>{servico.id_servico}</td>        
                                <td>{servico.titulo_servico}</td>
                                <td>{servico.desc_servico}</td>
                                <td>{getTipoProdutoDescricao(servico.id_tipo)}</td>
                                <td>{servico.img_servico}</td>
                                <td>{servico.ativo ? 'Sim' : 'Não'}</td>
                                <td>{new Date(servico.dt_cadastro).toLocaleDateString()}</td>
                                <td>
                                    <button className="adm_edit_btn" onClick={() => handleEditClick(servico)}>Editar</button>
                                    <button className="adm_delete_btn" onClick={() => handleExcluirServico(servico.id_servico)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adicionar Serviços</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" id='tit' name='tit' value={formData.tit} onChange={handleChange} required />

                            <label>Descrição:</label>
                            <input type="text" id='desc' name='desc' value={formData.desc} onChange={handleChange} required />

                            <label htmlFor="tipo_desc">Tipo de Produto:</label>
                            <select id="tipo_id" name="tipo_id" className="chamados-input" value={formData.tipo_id} onChange={handleChange} required>
                                <option value="">Selecione um tipo de produto</option>
                                {tiposProduto.map(tipo => (
                                    <option key={tipo.id_tipo} value={tipo.id_tipo}>
                                        {tipo.desc_tipo}
                                    </option>
                                ))}
                            </select>

                            <label>Nome da imagem:</label>
                            <input type="text" id='img' name='img' value={formData.img} onChange={handleChange} required />

                            <div className="modal-buttons">
                                <button type="button" onClick={handleSalvarServico}>Salvar</button>
                                <button type="button" onClick={handleCancelarClick}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditModal && (
                    <div className="modal">
                        <div className="modal-content">
                        <h2>Editar Serviço</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" id="tit" name="tit" value={formData.tit} onChange={handleChange} required />
                            
                            <label>Descrição:</label>
                            <input type="text" id='desc' name='desc' value={formData.desc} onChange={handleChange} required />

                            <label htmlFor="tipo_desc">Tipo de Produto:</label>
                            <select id="tipo_id" name="tipo_id" className="chamados-input" value={formData.tipo_id} onChange={handleChange} required>
                                <option value="">Selecione um tipo de produto</option>
                                {tiposProduto.map(tipo => (
                                    <option key={tipo.id_tipo} value={tipo.id_tipo}>
                                        {tipo.desc_tipo}
                                    </option>
                                ))}
                            </select>

                            <label>Nome da imagem:</label>
                            <input type="text" id='img' name='img' value={formData.img} onChange={handleChange} required />

                            <label htmlFor="ativo">Ativo:</label>
                            <input type="checkbox" id="ativo" name="ativo" checked={formData.ativo} onChange={handleChange} />

                            <div className="modal-buttons">
                                    <button type="button" onClick={handleUpdateServico}>Salvar</button>
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
                            <p>Deseja realmente excluir o serviço {servicoIdToDelete}?</p>
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

export default ServicosCrud;
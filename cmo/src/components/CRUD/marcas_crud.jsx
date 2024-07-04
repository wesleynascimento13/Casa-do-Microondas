import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function MarcasCrud() {
    const navigate = useNavigate();
    const [marcas, setMarcas] = useState([]);
    const [setErro] = useState(null);
    const [editandoMarca, setEditandoMarca] = useState(null);
    const [marcaIdToDelete, setMarcaIdToDelete] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [formData, setFormData] = useState({
        id: 1,
        tit: '',
        logo: '',
        flag: 1,
        oper: 'u',
    });

    useEffect(() => {
        const permissao = localStorage.getItem('permissao');
        if (permissao !== 'adm') {
            navigate('/'); 
        } else {
            fetchMarcas();
        }
    }, [navigate]);
  
    const fetchMarcas = async () => {
        try {
            const response = await api.get('/admmarcas');
            setMarcas(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            setErro("Erro ao buscar marcas. Tente novamente mais tarde.");
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

    const handleSalvarMarca = async () => {
        // Verificar se todos os campos estão preenchidos
        for (const key in formData) {
            if (formData[key] === '' || formData[key] === null) {
            alert('Por favor, preencha todos os campos.');
            return;
            }
        }

        try {
            const token = localStorage.getItem('token'); // Exemplo: Recupere o token de onde você o armazenou
            const response = await api.post('/marcas', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Marca adicionado com sucesso!');
            setShowModal(false); 
            fetchMarcas(); 

            // Limpar os campos do formulário
            setFormData({
                id: 1,
                tit: '',
                logo: '',
                flag: 1,
                oper: 'u',
            });

        } catch (err) {
            console.error("Erro ao adicionar marca:", err);
            alert('Erro ao adicionar marca. Verifique os dados e tente novamente.');
        }
    };

    const handleCancelarClick = () => {
        setShowModal(false);

        setFormData({
            id: 1,
            tit: '',
            logo: '',
            flag: 1,
            oper: 'u',
        });
    };


    // put

    const handleEditClick = (marca) => {
        
        setFormData({
            id: marca.id_marca,
            tit: marca.desc_marca,
            logo:marca.logo_marca,
            flag: marca.fl_marca,
            oper: 'u',
        });
        setEditandoMarca(marca.id_marca); 
        setShowEditModal(true); // Abrir o modal de edição
        };

    const handleUpdateMarca = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Incluir o id_chamado no formData
            formData.id_marca = editandoMarca;

            const response = await api.put(`/marcas`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Marca atualizada com sucesso!');
            setShowEditModal(false);
            fetchMarcas();

            setFormData({
                id: 1,
                tit: '',
                logo: '',
                flag: 1,
                oper: 'u',
            });
            

        } catch (err) {
            console.error("Erro ao atualizar marca:", err);
            alert('Erro ao atualizar marca. Verifique os dados e tente novamente.');
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false); // Fechar o modal ao clicar em Cancelar
        setFormData({
            id: 1,
            tit: '',
            logo: '',
            flag: 1,
            oper: 'u',
        });
    };

    // DELETE

    const handleExcluirMarca = (id) => {
        setMarcaIdToDelete(id);
        setShowDeleteModal(true); 
    };
    
    const confirmarExclusao = async () => {
        try {
            await api.put(`/marcas`, {
                id: marcaIdToDelete,
                oper: 'd'
            });
    
            console.log('Exclusão de marca bem-sucedida'); // Log de sucesso
            setShowDeleteModal(false);
            fetchMarcas(); 
    
        } catch (error) {
            console.error('Erro ao excluir marca:', error); // Log de erro
            alert('Erro ao excluir marca. Verifique e tente novamente.');
        }
    };
    
    const cancelarExclusao = () => {
        setShowDeleteModal(false); // Fechar modal de confirmação de exclusão
    };
    

    return (
        <div className="adm_container">
            <h2 className="adm_title">Marcas</h2>
            <button className="adm_add_btn" onClick={handleAdicionarClick}>Adicionar</button>

            <div className="adm_table_container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Logo</th>
                            <th>Ativo</th>
                            <th>Data Cadastro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marcas.map(marca => (
                            <tr key={marca.id_marca}>
                                <td>{marca.id_marca}</td>
                                <td>{marca.desc_marca}</td>
                                <td>{marca.logo_marca}</td>
                                <td>{marca.fl_marca ? 'Sim' : 'Não'}</td>
                                <td>{new Date(marca.dt_cadastro).toLocaleDateString()}</td>
                                <td>
                                    <button className="adm_edit_btn"  onClick={() => handleEditClick(marca)}>Editar</button>
                                    <button className="adm_delete_btn"  onClick={() => handleExcluirMarca(marca.id_marca)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (

                <div className="modal">
                    <div className="modal-content">
                        <h2>Adicionar Marca</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" id='tit' name='tit' value={formData.tit} onChange={handleChange} required />

                            <label>Nome da Logo:</label>
                            <input type="text" id='logo' name='logo' value={formData.logo} onChange={handleChange} required />

                            <div className="modal-buttons">
                                <button type="button" onClick={handleSalvarMarca}>Salvar</button>
                                <button type="button" onClick={handleCancelarClick}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                    <h2>Editar Marca</h2>
                    <form>
                        <label>Nome:</label>
                        <input type="text" id="tit" name="tit" value={formData.tit} onChange={handleChange} required />
                        
                        <label>Nome da Logo:</label>
                        <input type="text" id='logo' name='logo' value={formData.logo} onChange={handleChange} required />

                        <label htmlFor="ativo">Ativo:</label>
                        <input type="checkbox" id="flag" name="flag" checked={formData.flag} onChange={handleChange} />

                        <div className="modal-buttons">
                                <button type="button" onClick={handleUpdateMarca}>Salvar</button>
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
                        <p>Deseja realmente excluir a marca {marcaIdToDelete}?</p>
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

export default MarcasCrud;
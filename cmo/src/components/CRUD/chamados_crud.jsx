import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function ChamadosCrud() {
    const navigate = useNavigate();
    const [erro, setErro] = useState(null);
    const [Chamados, setChamados] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tiposProduto, setTiposProduto] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [editandoChamado, setEditandoChamado] = useState(null);
    const [chamadoIdToDelete, setchamadoIdToDelete] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({
        id_chamado: 1,
        desc_chamado: '',
        tipo_desc: '',
        nr_serie: '',
        capacidade: '',
        marca: '',
        status: 'Aberta',
        entrega: false,
        ativo: false,
        oper: 'u'
    });

    useEffect(() => {
        const permissao = localStorage.getItem('permissao');
        if (permissao !== 'adm') {
            navigate('/'); // Redireciona para a página inicial se não for administrador
        } else {
            fetchChamados(); // Carrega chamados ao montar o componente
            fetchMarcas(); // Carrega marcas ao montar o componente
            fetchTiposProduto(); // Carrega tipos de produto ao montar o componente
            fetchClientes(); // Carrega clientes ao montar o componente
        }
    }, [navigate]);

    const fetchChamados = async () => {
        try {
            const response = await api.get('/admchamados');
            setChamados(response.data);
        } catch (error) {
            console.error("Erro ao buscar chamados:", error);
            setErro("Erro ao buscar chamados. Tente novamente mais tarde.");
        }
    };

    const fetchMarcas = async () => {
        try {
            const response = await api.get('/marcas');
            setMarcas(response.data);
        } catch (error) {
            console.error("Erro ao buscar marcas:", error);
            setErro("Erro ao buscar marcas. Tente novamente mais tarde.");
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

    const fetchClientes = async () => {
        try {
            const response = await api.get('/admCliente');
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            setErro("Erro ao buscar clientes. Tente novamente mais tarde.");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const getClientNameById = (id_cliente) => {
        const cliente = clientes.find(cliente => cliente.id_cliente === id_cliente);
        return cliente ? `${id_cliente} - ${cliente.nome_cliente}` : id_cliente;
    };

// post

    const handleAdicionarClick = () => {
        setShowModal(true); // Mostra o modal ao clicar em "Adicionar"
    };

    const handleSalvarChamado = async () => {
      // Verificar se todos os campos estão preenchidos
      for (const key in formData) {
        if (formData[key] === '' || formData[key] === null) {
          alert('Por favor, preencha todos os campos.');
          return;
        }
      }

        try {
            const token = localStorage.getItem('token'); // Exemplo: Recupere o token de onde você o armazenou
            const response = await api.post('/admchamados', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Chamado adicionado com sucesso!');
            setShowModal(false); // Fecha o modal após o cadastro
            fetchChamados(); // Atualiza a lista de chamados

            // Limpar os campos do formulário
            setFormData({
                id_cliente: '',
                desc_chamado: '',
                tipo_desc: '',
                marca: '',
                entrega: false,
            });

        } catch (err) {
            console.error("Erro ao adicionar chamado:", err);
            alert('Erro ao adicionar chamado. Verifique os dados e tente novamente.');
        }
    };

    const handleCancelarClick = () => {
        setShowModal(false); // Fecha o modal ao clicar em "Cancelar"
        setFormData({
            id_cliente: '',
            desc_chamado: '',
            tipo_desc: '',
            marca: '',
            entrega: false,
        });
    };

    // put

    const handleEditClick = (chamado) => {
        // Obter a descrição do tipo de produto correspondente ao id_tipo
        const tipoProduto = tiposProduto.find(tipo => tipo.id_tipo === chamado.id_tipo);

     
        // Preencher o formulário com os dados do chamado selecionado
        setFormData({
            desc_chamado: chamado.desc_chamado,
            tipo_desc: tipoProduto ? tipoProduto.desc_tipo : '',
            nr_serie: formData.nr_serie || chamado.nr_serie || '',
            capacidade: formData.capacidade || chamado.capacidade || '',
            marca: chamado.marca || '',
            modelo: null,
            status: chamado.status_chamado,
            entrega: chamado.entrega,
            ativo: chamado.ativo,
            oper: "u"
        });
        setEditandoChamado(chamado.id_chamado); // Armazenar o ID do chamado sendo editado
        setShowEditModal(true); // Abrir o modal de edição
    };

    const handleUpdateChamado = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Incluir o id_chamado no formData
            formData.id_chamado = editandoChamado;
    
            const response = await api.put(`/chamados`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Chamado atualizado com sucesso!');
            setShowEditModal(false);
            fetchChamados();

            setFormData({
                id_cliente: '',
                desc_chamado: '',
                tipo_desc: '',
                marca: '',
                entrega: false,
            });
            

        } catch (err) {
            console.error("Erro ao atualizar chamado:", err);
            alert('Erro ao atualizar chamado. Verifique os dados e tente novamente.');
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false); // Fechar o modal ao clicar em Cancelar
        setFormData({
            id_cliente: '',
            desc_chamado: '',
            tipo_desc: '',
            marca: '',
            entrega: false,
        });
    };

    // DELETE

    const handleExcluirChamado = (id) => {
        setchamadoIdToDelete(id);
        setShowDeleteModal(true); 
    };

    const confirmarExclusao = async () => {
        try {
            await api.put(`/chamados`, {
                id_chamado: chamadoIdToDelete,
                oper: 'd'
            });
            console.log('chamado excluído com sucesso');
            setShowDeleteModal(false); 
            fetchChamados(); 
        } catch (error) {
            console.error('Erro ao excluir chamado:', error);
            alert('Erro ao excluir chamado. Verifique e tente novamente.');
        }
    };

    const cancelarExclusao = () => {
        setShowDeleteModal(false); // Fechar modal de confirmação de exclusão
    };


    return (
        <div className="adm_container">
            <h2 className="adm_title">Chamados</h2>
            <button className="adm_add_btn" onClick={handleAdicionarClick}>Adicionar</button>

            {erro && <div className="erro">{erro}</div>}

            <div className="adm_table_container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Problema</th>
                            <th>Tipo de Produto</th>
                            <th>Produto</th>
                            <th>Marca</th>
                            <th>Status</th>
                            <th>Entrega</th>
                            <th>Ativo</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Chamados.map(chamado => (
                            
                            <tr key={chamado.id_chamado}>
                                <td>{chamado.id_chamado}</td>
                                <td>{getClientNameById(chamado.id_cliente)}</td>
                                <td>{chamado.desc_chamado}</td>
                                <td>{chamado.desc_tipo}</td>
                                <td>{chamado.id_produto}</td>
                                <td>{chamado.marca}</td>
                                <td>{chamado.status_chamado}</td>
                                <td>{chamado.entrega ? 'Sim' : 'Não'}</td>
                                <td>{chamado.ativo ? 'Sim' : 'Não'}</td>
                                <td>{new Date(chamado.dt_chamado).toLocaleDateString()}</td>
                                <td>
                                    <button className="adm_edit_btn" onClick={() => handleEditClick(chamado)}>Editar</button>
                                    <button className="adm_delete_btn" onClick={() => handleExcluirChamado(chamado.id_chamado)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adicionar Chamado</h2>
                        <form>
                            <label htmlFor="id_cliente">ID Cliente:</label>
                            <select id="id_cliente" name="id_cliente" className="chamados-input" value={formData.id_cliente} onChange={handleChange} required>
                                <option value="">Selecione um cliente</option>
                                {clientes.map(cliente => (
                                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                        {cliente.id_cliente}: {cliente.nome_cliente}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="desc_chamado">Descrição do Chamado:</label>
                            <input type="text" id="desc_chamado" name="desc_chamado" value={formData.desc_chamado} onChange={handleChange} required />
                            <label htmlFor="tipo_desc">Tipo de Produto:</label>
                            <select id="tipo_desc" name="tipo_desc" className="chamados-input" value={formData.tipo_desc} onChange={handleChange} required>
                                <option value="">Selecione um tipo de produto</option>
                                {tiposProduto.map(tipo => (
                                    <option key={tipo.id_tipo} value={tipo.desc_tipo}>
                                        {tipo.desc_tipo}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="nr_serie">N Série:</label>
                            <input type="text" id="nr_serie" name="nr_serie" checked={formData.nr_serie} onChange={handleChange} />
                            <label htmlFor="capacidade">Capacidade:</label>
                            <input type="text" id="capacidade" name="capacidade" checked={formData.capacidade} onChange={handleChange} />
                            <label htmlFor="marca">Marca:</label>
                            <select id="marca" name="marca" className="chamados-input" value={formData.marca} onChange={handleChange} required>
                                <option value="">Selecione uma marca</option>
                                {marcas.map(marca => (
                                    <option key={marca.id_marca} value={marca.desc_marca}>
                                        {marca.desc_marca}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="entrega">Entrega:</label>
                            <input type="checkbox" id="entrega" name="entrega" checked={formData.entrega} onChange={handleChange} />
                            <div className="modal-buttons">
                                <button type="button" onClick={handleSalvarChamado}>Salvar</button>
                                <button type="button" onClick={handleCancelarClick}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Chamado</h2>
                        <form>
                            <label htmlFor="desc_chamado">Descrição do Chamado:</label>
                            <input type="text" id="desc_chamado" name="desc_chamado" value={formData.desc_chamado} onChange={handleChange} required />

                            <label htmlFor="tipo_desc">Tipo de Produto:</label>
                            <select id="tipo_desc" name="tipo_desc" className="chamados-input" value={formData.tipo_desc} onChange={handleChange} required>
                                <option value="">Selecione um tipo de produto</option>
                                {tiposProduto.map(tipo => (
                                    <option key={tipo.id_tipo} value={tipo.desc_tipo}>
                                        {tipo.desc_tipo}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="marca">Marca:</label>
                            <select id="marca" name="marca" className="chamados-input" value={formData.marca} onChange={handleChange} required>
                                <option value="">Selecione uma marca</option>
                                {marcas.map(marca => (
                                   <option key={marca.id_marca} value={marca.desc_marca}>
                                        {marca.desc_marca}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="status">Status:</label>
                            <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} />

                            <label htmlFor="entrega">Entrega:</label>
                            <input type="checkbox" id="entrega" name="entrega" checked={formData.entrega} onChange={handleChange} />

                            <label htmlFor="ativo">Ativo:</label>
                            <input type="checkbox" id="ativo" name="ativo" checked={formData.ativo} onChange={handleChange} />


                            <div className="modal-buttons">
                                <button type="button" onClick={handleUpdateChamado}>Salvar</button>
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
                        <p>Deseja realmente excluir o chamado {chamadoIdToDelete}?</p>
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

export default ChamadosCrud;

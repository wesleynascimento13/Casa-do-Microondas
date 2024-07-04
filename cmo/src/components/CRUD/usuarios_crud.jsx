import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function UsuariosCrud() {
    
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [erro, setErro] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [ShowEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [clienteIdToDelete, setClienteIdToDelete] = useState(null);
    const [clienteId, setClienteId] = useState(null);
    const [nome, setNome] = useState('');
    const [stat, setStat] = useState('');
    const [endereco, setEndereco] = useState('');
    const [fone, setFone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [permissao, setPermissao] = useState('cliente');

    useEffect(() => {
        const permissao = localStorage.getItem('permissao');
        if (permissao !== 'adm') {
            navigate('/'); // Redireciona para a página inicial se não for administrador
        } else {
            fetchClientes(); // Carrega clientes ao montar o componente
        }
    }, [navigate]);

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
        setShowModal(true); // Mostra o modal ao clicar em "Adicionar"
    };

    const handleSalvarCliente = async () => {
        try {
            const response = await api.post('/clientes', {
                nome,
                endereco,
                fone,
                email,
                senha,
                permissao,
            });
            console.log(response.data);
            console.log("permissao:", permissao)
            alert('Cliente cadastrado com sucesso!');
            setShowModal(false); // Fecha o modal após o cadastro
            fetchClientes(); // Atualiza a lista de clientes

             // Limpar os campos do formulário
            setNome('');
            setEndereco('');
            setFone('');
            setEmail('');
            setSenha('');
            setPermissao('cliente');

        } catch (err) {
            console.error(err);
            alert('Erro ao cadastrar cliente. Verifique os dados e tente novamente.');
        }
    };

    const handleCancelarClick = () => {
        setShowModal(false);

        setNome('');
        setEndereco('');
        setFone('');
        setEmail('');
        setSenha('');
        setPermissao('');
    };

    // edição de usuario

    const handleEditarCliente = (cliente) => {
        // Preencher o modal com os dados do cliente selecionado
        setClienteId(cliente.id_cliente);
        setNome(cliente.nome_cliente);
        setStat(cliente.status);
        setEndereco(cliente.endereco_cliente);
        setFone(cliente.fone_cliente);
        setEmail(cliente.email_cliente);
        setPermissao(cliente.permissao);

        // Mostrar o modal de edição
        setShowEditModal(true);
    };

    const handleSalvarEdicao = async () => {
        try {
            const response = await api.put('/clientes', {
                id_cliente: clienteId,
                nome,
                stat, // Ajuste conforme necessário
                endereco,
                fone,
                email,
                permissao,
                ativo: true,  // Ajuste conforme necessário
                oper: 'u'
            });

            console.log(response.data);
            alert('Cliente atualizado com sucesso!');
            setShowEditModal(false); // Fechar o modal de edição
            fetchClientes(); // Atualizar a lista de clientes após edição

            setNome('');
            setEndereco('');
            setFone('');
            setEmail('');
            setSenha('');
            setPermissao('');

        } catch (err) {
            console.error(err);
            alert('Erro ao atualizar cliente. Verifique os dados e tente novamente.');
        }
    };

    const handleCancelarEdicao = () => {
        setShowEditModal(false); // Fechar o modal de edição
        
        setNome('');
        setEndereco('');
        setFone('');
        setEmail('');
        setSenha('');
        setPermissao('');
    };
    
    // exclusão de usuario

    const handleExcluirCliente = (id) => {
        setClienteIdToDelete(id);
        setShowDeleteModal(true); // Mostrar modal de confirmação de exclusão
    };

    const confirmarExclusao = async () => {
        try {
            await api.put(`/clientes`, {
                id_cliente: clienteIdToDelete,
                oper: 'd'
            });
            console.log('Cliente excluído com sucesso');
            setShowDeleteModal(false); // Fechar modal de confirmação de exclusão
            fetchClientes(); // Atualizar lista de clientes após exclusão
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            alert('Erro ao excluir cliente. Verifique e tente novamente.');
        }
    };

    const cancelarExclusao = () => {
        setShowDeleteModal(false); // Fechar modal de confirmação de exclusão
    };



    return (
        <div className="adm_container">
            <h2 className="adm_title">Usuários</h2>
            <button className="adm_add_btn" onClick={handleAdicionarClick}>Adicionar</button>

            {erro && <div className="erro">{erro}</div>}

            <div className="adm_table_container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Endereço</th>
                            <th>Fone</th>
                            <th>Email</th>
                            <th>Permissão</th>
                            <th>Ativo</th>
                            <th>Data Cadastro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id_cliente}>
                                <td>{cliente.id_cliente}</td>
                                <td>{cliente.nome_cliente}</td>
                                <td>{cliente.status}</td>
                                <td>{cliente.endereco_cliente}</td>
                                <td>{cliente.fone_cliente}</td>
                                <td>{cliente.email_cliente}</td>
                                <td>{cliente.permissao}</td>
                                <td>{cliente.atv ? 'Sim' : 'Não'}</td>
                                <td>{new Date(cliente.dt_cadastro).toLocaleDateString()}</td>
                                <td>
                                    <button className="adm_edit_btn" onClick={() => handleEditarCliente(cliente)}>Editar</button>
                                    <button className="adm_delete_btn"  onClick={() => handleExcluirCliente(cliente.id_cliente)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adicionar Cliente</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            <label>Endereço:</label>
                            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                            <label>Fone:</label>
                            <input type="text" value={fone} onChange={(e) => setFone(e.target.value)} required />
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label>Senha:</label>
                            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                            <label>Permissão:</label>
                            <select value={permissao} onChange={(e) => setPermissao(e.target.value)} required>
                                <option value="cliente">Cliente</option>
                                <option value="adm">Administrador</option>
                            </select>
                            <div className="modal-buttons">
                                <button type="button" onClick={handleSalvarCliente}>Salvar</button>
                                <button type="button" onClick={handleCancelarClick}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {ShowEditModal && (
                <div className="modal">
                    {/* Modal de Editar Cliente */}
                    <div className="modal-content">
                        <h2>Editar Cliente</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />       
                            <label>Status:</label>
                            <input type="text" value={stat} onChange={(e) => setStat(e.target.value)} required /> 
                            <label>Endereço:</label>
                            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                            <label>Fone:</label>
                            <input type="text" value={fone} onChange={(e) => setFone(e.target.value)} required />
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label>Permissão:</label>
                            <select value={permissao} onChange={(e) => setPermissao(e.target.value)} required>
                                <option value="cliente">Cliente</option>
                                <option value="adm">Administrador</option>
                            </select>
                            <div className="modal-buttons">
                                <button type="button" onClick={handleSalvarEdicao}>Salvar</button>
                                <button type="button" onClick={handleCancelarEdicao}>Cancelar</button>
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
                        <p>Deseja realmente excluir o cliente {clienteIdToDelete}?</p>
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

export default UsuariosCrud;

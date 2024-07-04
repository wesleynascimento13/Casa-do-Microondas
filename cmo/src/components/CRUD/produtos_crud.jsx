import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';


function ProdutosCrud() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [setErro] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [tiposProduto, setTiposProduto] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [editandoProduto, setEditandoProduto] = useState(null);
  const [produtoIdToDelete, setprodutoIdToDelete] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const [formData, setFormData] = useState({
      id: 1,
      tit: '',
      id_clien: '',
      id_tip: '',
      id_marc: '',
      n_serie: '',
      capac: '',
      problem: '',
      soluc: 'Aguardando solução...',
      atv: 1,
      oper: "u"
  });

  useEffect(() => {
      const permissao = localStorage.getItem('permissao');
      if (permissao !== 'adm') {
          navigate('/'); 
      } else {
          fetchProdutos();
          fetchClientes();
          fetchTiposProduto();
          fetchMarcas();
      }
  }, [navigate]);

  const fetchProdutos = async () => {
      try {
          const response = await api.get('/admProdutos');
          setProdutos(response.data);
      } catch (error) {
          console.error("Erro ao buscar produtos:", error);
          setErro("Erro ao buscar produtos. Tente novamente mais tarde.");
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

  const fetchTiposProduto = async () => {
    try {
      const response = await api.get('/admTipoProduto');
      setTiposProduto(response.data);
    } catch (error) {
      console.error("Erro ao buscar tipos de produto:", error);
      setErro("Erro ao buscar tipos de produto. Tente novamente mais tarde.");
    }
  };

  const fetchMarcas = async () => {
    try {
      const response = await api.get('/admmarcas');
      setMarcas(response.data);
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
      setErro("Erro ao buscar marcas. Tente novamente mais tarde.");
    }
  };


  // post

  const handleAdicionarClick = () => {
    setShowModal(true); 
  };

  const handleSalvarProduto = async () => {
      // Verificar se todos os campos estão preenchidos
      for (const key in formData) {
        if (formData[key] === '' || formData[key] === null) {
          alert('Por favor, preencha todos os campos.');
          return;
        }
      }

    try {
        const token = localStorage.getItem('token'); // Exemplo: Recupere o token de onde você o armazenou
        const response = await api.post('/produtos', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        alert('Produto adicionado com sucesso!');
        setShowModal(false); 
        fetchProdutos(); 

        // Limpar os campos do formulário
        setFormData({
          tit: '',
          id_clien: '',
          id_tip: '',
          id_marc: '',
          n_serie: '',
          capac: '',
          problem: '',
          soluc: '',
          atv: '',
        });

    } catch (err) {
        console.error("Erro ao adicionar chamado:", err);
        alert('Erro ao adicionar chamado. Verifique os dados e tente novamente.');
    }
  };

  const handleCancelarClick = () => {
    setShowModal(false);

    setFormData({
      tit: '',
      id_clien: '',
      id_tip: '',
      id_marc: '',
      n_serie: '',
      capac: '',
      problem: '',
      soluc: '',
      atv: '',
    });
  };

  // put

  const handleEditClick = (produto) => {
  

   
    // Preencher o formulário com os dados do chamado selecionado
    setFormData({
      id: produto.id_produto,
      tit: produto.desc_produto || produto.desc_produto || '',
      id_clien: produto.id_cliente,
      id_tip: produto.id_tipo,
      id_marc: produto.id_marca,
      n_serie: produto.nr_serie || produto.nr_serie || '',
      capac: produto.capacidade || produto.capacidade || '',
      problem: produto.problema || produto.problema || '',
      soluc: produto.solucao || produto.solucao || '',
      atv: produto.ativo,
      oper: "u"
    });
    setEditandoProduto(produto.id_produto); // Armazenar o ID do chamado sendo editado
    setShowEditModal(true); // Abrir o modal de edição
    };

  const handleUpdateProduto = async () => {
    try {
        const token = localStorage.getItem('token');
        
        // Incluir o id_chamado no formData
        formData.id_produto = editandoProduto;

        const response = await api.put(`/produtos`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        alert('Produto atualizado com sucesso!');
        setShowEditModal(false);
        fetchProdutos();

        setFormData({
          tit: '',
          id_clien: '',
          id_tip: '',
          id_marc: '',
          n_serie: '',
          capac: '',
          problem: '',
          soluc: '',
          atv: '',
        });
        

    } catch (err) {
        console.error("Erro ao atualizar produto:", err);
        alert('Erro ao atualizar produto. Verifique os dados e tente novamente.');
    }
    };

  const handleCloseModal = () => {
    setShowEditModal(false); // Fechar o modal ao clicar em Cancelar
    setFormData({
      tit: '',
      id_clien: '',
      id_tip: '',
      id_marc: '',
      n_serie: '',
      capac: '',
      problem: '',
      soluc: '',
      atv: '',
    });
  };

    // DELETE

    const handleExcluirProduto = (id) => {
      setprodutoIdToDelete(id);
      setShowDeleteModal(true); 
  };

  const confirmarExclusao = async () => {
      try {
          await api.put(`/produtos`, {
              id: produtoIdToDelete,
              oper: 'd'
          });
    
          console.log('produto excluído com sucesso');
          setShowDeleteModal(false); 
          fetchProdutos(); 
      } catch (error) {
          console.error('Erro ao excluir produto:', error);
          alert('Erro ao excluir produto. Verifique e tente novamente.');
      }
  };

  const cancelarExclusao = () => {
      setShowDeleteModal(false); // Fechar modal de confirmação de exclusão
  };




  return (
    <div className="adm_container">
      <h2 className="adm_title">Produtos</h2>
      <button className="adm_add_btn" onClick={handleAdicionarClick}>Adicionar</button>
  
      <div className="adm_table_container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cliente</th>
              <th>Tipo de Produto</th>
              <th>Marca</th>
              <th>Número de Série</th>
              <th>Capacidade</th>
              <th>Problema</th>
              <th>Solução</th>
              <th>Ativo</th>
              <th>Data Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id_produto}>
                <td>{produto.id_produto}</td>
                <td>{produto.desc_produto}</td>
                <td>{`${produto.id_cliente}: ${clientes.find(cliente => cliente.id_cliente === produto.id_cliente)?.nome_cliente}`}</td>
                <td>{`${produto.id_tipo}: ${tiposProduto.find(tipo => tipo.id_tipo === produto.id_tipo)?.desc_tipo}`}</td>
                <td>{`${produto.id_marca}: ${marcas.find(marca => marca.id_marca === produto.id_marca)?.desc_marca}`}</td>
                <td>{produto.nr_serie}</td>
                <td>{produto.capacidade}</td>
                <td>{produto.problema}</td>
                <td>{produto.solucao}</td>
                <td>{produto.ativo ? 'Sim' : 'Não'}</td>
                <td>{new Date(produto.dt_cadastro).toLocaleDateString()}</td>
                <td>
                  <button className="adm_edit_btn" onClick={() => handleEditClick(produto)}>Editar</button>
                  <button className="adm_delete_btn" onClick={() => handleExcluirProduto(produto.id_produto)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Produto</h2>
            <form>
              <label>Nome:</label>
              <input type="text" id="tit" name="tit" value={formData.tit} onChange={handleChange} required />
              <label htmlFor="id_cliente">ID Cliente:</label>
              <select id="id_clien" name="id_clien" className="chamados-input" value={formData.id_clien} onChange={handleChange} required>
                <option value="">Selecione um cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.id_cliente}: {cliente.nome_cliente}
                  </option>
                ))}
              </select>
              <label htmlFor="tipo_desc">Tipo de Produto:</label>
              <select id="id_tip" name="id_tip" className="chamados-input" value={formData.id_tip} onChange={handleChange} required>
                <option value="">Selecione um tipo de produto</option>
                {tiposProduto.map(tipo => (
                  <option key={tipo.id_tipo} value={tipo.id_tipo}>
                    {tipo.desc_tipo}
                  </option>
                ))}
              </select>
              <label htmlFor="marca">Marca:</label>
              <select id="id_marc" name="id_marc" className="chamados-input" value={formData.id_marc} onChange={handleChange} required>
                <option value="">Selecione uma marca</option>
                {marcas.map(marca => (
                  <option key={marca.id_marca} value={marca.id_marca}>
                    {marca.desc_marca}
                  </option>
                ))}
              </select>
              <label>Número de Série:</label>
              <input type="text" id='n_serie' name='n_serie' value={formData.n_serie} onChange={handleChange} required />
              <label>Capacidade:</label>
              <input type="text" id='capac' name='capac' value={formData.capac} onChange={handleChange} required />
              <label>Problema:</label>
              <input type="text" id='problem'name='problem' value={formData.problem} onChange={handleChange} required />
              <label>Solução:</label>
              <input type="text" id='soluc' name='soluc' value={formData.soluc} onChange={handleChange} required />
              <div className="modal-buttons">
                <button type="button" onClick={handleSalvarProduto}>Salvar</button>
                <button type="button" onClick={handleCancelarClick}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="modal">
            <div className="modal-content">
              <h2>Editar Produto</h2>
              <form>
                <label>Nome:</label>
                <input type="text" id="tit" name="tit" value={formData.tit} onChange={handleChange} required />
                <label htmlFor="id_cliente">ID Cliente:</label>
                <select id="id_clien" name="id_clien" className="chamados-input" value={formData.id_clien} onChange={handleChange} required>
                  <option value="">Selecione um cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                      {cliente.id_cliente}: {cliente.nome_cliente}
                    </option>
                  ))}
                </select>
                <label htmlFor="tipo_desc">Tipo de Produto:</label>
                <select id="id_tip" name="id_tip" className="chamados-input" value={formData.id_tip} onChange={handleChange} required>
                  <option value="">Selecione um tipo de produto</option>
                  {tiposProduto.map(tipo => (
                    <option key={tipo.id_tipo} value={tipo.id_tipo}>
                      {tipo.desc_tipo}
                    </option>
                  ))}
                </select>
                <label htmlFor="marca">Marca:</label>
                <select id="id_marc" name="id_marc" className="chamados-input" value={formData.id_marc} onChange={handleChange} required>
                  <option value="">Selecione uma marca</option>
                  {marcas.map(marca => (
                    <option key={marca.id_marca} value={marca.id_marca}>
                      {marca.desc_marca}
                    </option>
                  ))}
                </select>
                <label>Número de Série:</label>
                <input type="text" id='n_serie' name='n_serie' value={formData.n_serie} onChange={handleChange} required />
                <label>Capacidade:</label>
                <input type="text" id='capac' name='capac' value={formData.capac} onChange={handleChange} required />
                <label>Problema:</label>
                <input type="text" id='problem'name='problem' value={formData.problem} onChange={handleChange} required />
                <label>Solução:</label>
                <input type="text" id='soluc' name='soluc' value={formData.soluc} onChange={handleChange} required />
                <label htmlFor="ativo">Ativo:</label>
                <input type="checkbox" id="atv" name="atv" checked={formData.atv} onChange={handleChange} />
                <div className="modal-buttons">
                          <button type="button" onClick={handleUpdateProduto}>Salvar</button>
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
                      <p>Deseja realmente excluir o produto {produtoIdToDelete}?</p>
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

export default ProdutosCrud;

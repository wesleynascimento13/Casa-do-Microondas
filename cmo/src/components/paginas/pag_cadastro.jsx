import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function Cadastro(e) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [fone, setFone] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const btnCadastrarClick = async (e) => {
    e.preventDefault();

    const permissao = "cliente";

    try {
      const resp = await api.post('/clientes', { nome, email, fone, endereco, senha, permissao });
      console.log(resp.data);
      alert('Cadastro bem sucedido!');

      // Limpar os campos após o cadastro ser concluído
      setNome('');
      setEmail('');
      setEndereco('');
      setFone('');
      setSenha('');

      navigate('/login');

    } catch (err) {
      console.error(err);
      alert('Erro ao enviar os dados de cadastro');
    }
  };

  return (
    <div className="register-container">
      <form className="custom-register-form" onSubmit={btnCadastrarClick}>
        <h2>Cadastro</h2>
        <div className="form-group">
          <label htmlFor="name">Nome Completo:</label>
          <input type="text" id="name" name="name" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="fone">Telefone de Contato:</label>
          <input
            type="text"
            id="fone"
            name="fone"
            title="Digite um telefone válido..."
            value={fone}
            onChange={(e) => setFone(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço Completo:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
            autoComplete="street-address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}



export default Cadastro;

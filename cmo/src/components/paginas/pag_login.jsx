import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../styles/styles.css';

function Login() {


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  // Verifica se o cliente já está logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/conta-cliente');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resp = await api.post('/login', { email, senha });
      const { autenticado, token, idCliente, permissao } = resp.data; 
      console.log("permissao:", permissao)
      
      if (autenticado) {
        localStorage.setItem('token', token);
        localStorage.setItem('idCliente', idCliente);
        localStorage.setItem('permissao', permissao); // Armazena a permissão
        setModalMessage('Login realizado com sucesso!');
        setTimeout(() => {
          setModalMessage('');
          navigate('/conta-cliente'); // Navega para a conta do cliente
        }, 2000);
      } else {
        setMensagemErro('Email ou senha inválidos');
        setModalMessage('Erro: Email ou senha inválidos');
        setTimeout(() => setModalMessage(''), 2000);
      }
    } catch (err) {
      console.error('Erro ao tentar fazer login:', err);
      setMensagemErro('Erro ao tentar fazer login');
      setModalMessage('Erro: Não foi possível fazer login');
      setTimeout(() => setModalMessage(''), 2000);
    }
  };

  return (
    <div className="login-container-unique">
      <form className="custom-login-form-unique" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group-unique">
          <label htmlFor="senha">Senha:</label>
          <input 
            type="password" 
            id="senha" 
            name="senha"  
            value={senha}
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
        </div>
        {mensagemErro && <p className="error-message">{mensagemErro}</p>}
        {modalMessage && (
          <div className="modal">
            <div className="modal-content">
              <p>{modalMessage}</p>
            </div>
          </div>
        )}
        <button className="custom-button" type="submit">Entrar</button>
      </form>
      <p className="centralizado">
        Caso não possua conta <a href="/cadastro">cadastre-se</a>
      </p>
    </div>
  );
}

export default Login;

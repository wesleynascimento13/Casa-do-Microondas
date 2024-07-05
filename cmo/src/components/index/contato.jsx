import React, { useEffect, useState } from 'react';
import '../../styles/styles.css';
import api from '../../api/api';
import { isUserLoggedIn as checkUserLoggedIn } from '../../utils/loginout'; // Renomeando a função importada

function Contato(props) {
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [idCliente, setIdCliente] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Obter o ID do cliente logado do localStorage
    const clienteId = localStorage.getItem('idCliente');
    if (clienteId) {
      setIdCliente(clienteId);
      setLoggedIn(checkUserLoggedIn()); // Verifica se o usuário está logado usando a função importada
    }

    const contatoSection = document.getElementById('contato');
    if (contatoSection) {
      contatoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se está logado antes de enviar
    if (!loggedIn) {
      alert('É necessário estar logado para enviar uma mensagem.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); // Obtém o token do localStorage
      const response = await api.post('/contatos', {
        id_clien: idCliente,
        assunto,
        mensagem,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Adiciona o token no cabeçalho da solicitação
        }
      });
      alert('Mensagem enviada com sucesso!');
      setAssunto('');
      setMensagem('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente mais tarde.');
    }
  };

  return (
    <section id="contato">
      <div >
        <h2 className='centralizado'>Entre em Contato</h2>
        <img
          src={props.img_fundo}
          alt="retangulo laranja"
          width="75"
          height="4"
          className="imagem-centralizada"
        />
        <br />
        <div id="form-container">
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="assunto">
              <label htmlFor="assunto">Assunto</label>
              <input
                type="text"
                id="assunto"
                name="assunto"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                required
             
              />
            </div>
           
            <div className="mensagem" >
              <label htmlFor="mensagem">Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows="6"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
              
              ></textarea>
            </div>
            <button
              type="submit"
              className='butão'
              style={{ color: 'white', }}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contato;

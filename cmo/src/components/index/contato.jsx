import React, { useEffect } from 'react';
import '../../styles/styles.css';
//import {api} from '../../api/api';

function Contato(props) {
/*
    function btnEnviarClick(){
      let cliente = document.getElementById('name')
      let fone = document.getElementById('phone')
      let email = document.getElementById('email') // marca
      let mensagem = document.getElementById('message') // problema
      let tipoCham = 'Chamado'

      const tipoProd = '';
      const produto = '';

      api.post('/chamado', {cliente, fone, email, marca:assunto, problema: mensagem, tipoCham})
        .then((resp) => {
          console.log(resp);
          alert('Os dados foram enviados com sucesso');
        })
        .catch((err) =>{
          console.error(err);
          alert('Erro ao enviar os dados de contado');
        })

    }
*/
useEffect(() => {
  const contatoSection = document.getElementById('contato');
  if (contatoSection) {
      contatoSection.scrollIntoView({ behavior: 'smooth' });
  }
}, []);

  return (
    <section id="contato">
      <div className="container_2">
        <h2>Entre em Contato</h2>
        <img src={props.img_fundo} alt="retangulo laranja" width="75" height="4" className="imagem-centralizada" /> <br />
        <div id="form-container">
          <form id="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Endereço de E-mail</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea id="message" name="message" rows="6" required></textarea> {/* Aumentei o número de linhas */}
            </div>
            <button type="submit" style={{ color: 'white', fontSize: '14px' }} /*onClick={btnEnviarClick}*/>Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contato;

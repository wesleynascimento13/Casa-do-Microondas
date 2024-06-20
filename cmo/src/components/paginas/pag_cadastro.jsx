import React from 'react';
import api from '../../api/api';
import '../../styles/styles.css';

function btnCadastrarClick(e) {
  e.preventDefault(); 

  let nome = document.getElementById('name').value;
  let email = document.getElementById('email').value; 
  let endereco = document.getElementById('endereco').value; 
  let cpf = document.getElementById('cpf').value; 

  api.post('/cadastro', {nome, email, cpf, endereco})
        .then((resp) => {
          console.log(resp);
          alert('Os dados foram enviados com sucesso');
        })
        .catch((err) =>{
          console.error(err);
          alert('Erro ao enviar os dados de contado');
        })

    }

function Cadastro(props) {
  return (
    <div className="register-container">
      <form className="custom-register-form"  onSubmit={btnCadastrarClick}>
        <h2>Cadastro</h2>
        <div className="form-group">
          <label htmlFor="custom-fullname">Nome Completo:</label>
          <input type="text" id="name" name="custom-fullname" required />
        </div>
        <div className="form-group">
          <label htmlFor="custom-email">Email:</label>
          <input type="email" id="email" name="custom-email" required />
        </div>
        <div className="form-group">
        <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            pattern="\d{3}\d{3}\d{3}\d{2}"
            title="Digite um CPF com 11 dígitos no formato: xxxxxxxxxxx"
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="custom-address">Endereço Completo:</label>
          <input
            type="text"
            id="endereco"
            name="custom-address"
            required
            autoComplete="street-address"
          />
        </div>
        <br/>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;

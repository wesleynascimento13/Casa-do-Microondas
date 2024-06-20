import React from 'react';
import '../../styles/styles.css';
import Header from '../header/header';
import Footer from '../footer/footer';

function PagLogin(props) {
    return (
      <div className="login-container-unique">
        <form className="custom-login-form-unique">
          <h2>Login</h2>
          <div className="form-group-unique">
            <label htmlFor="custom-username">Usuário:</label>
            <input type="text" id="custom-username" name="custom-username" required />
          </div>
          <div className="form-group-unique">
            <label htmlFor="custom-password">Senha:</label>
            <input type="password" id="custom-password" name="custom-password" required />
          </div>
          <button className="custom-button" type="submit">Entrar</button>
        </form>
        <p className="centralizado">
          Caso não possua conta <a href="cadastro.html">cadastre-se</a>
        </p>
      </div>
    );
  }
  
  export default PagLogin;
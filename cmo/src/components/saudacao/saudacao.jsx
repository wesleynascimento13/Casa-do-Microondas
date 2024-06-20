import React from 'react';
import '../../styles/styles.css';

function Saudacao(props) {
    return <h1 style={{ marginTop: '100px' }}>Bem vindo a Casa do Microondas, {props.nome}!</h1>;
  }

export default Saudacao;
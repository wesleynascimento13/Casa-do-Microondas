import React from 'react';
import ReactDOM from 'react-dom/client';
import Saudacao from "./components/saudacao/saudacao.jsx"

// componentização

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <> 
    <Saudacao nome='João'/>  
    <p>Você está na página do projeto Prateleira Digital.</p>
  </>
);


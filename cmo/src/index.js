import React from 'react';
import ReactDOM from 'react-dom/client';
import Saudacao from "./components/saudacao/saudacao.jsx"
import Header from "./components/header/header.jsx"
import Footer from "./components/footer/footer.jsx"

// componentização

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <> 
    <Header marca='Casa do Microondas'/>
    <Footer marca='Casa do Microondas'/>
    <Saudacao nome='João'/>  
    <p>Você está na página do projeto Casa do microondas.</p>
   
    
  </>

);


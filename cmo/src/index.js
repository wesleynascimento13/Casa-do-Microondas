import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/layout.jsx';
import Inicio from "./components/index/inicio.jsx"
import Servicos from './components/index/servicos.jsx';
import Marca from './components/index/marcas.jsx';
import Contato from './components/index/contato.jsx';
import Localizacao from './components/index/localizacao.jsx';
import Cadastro from './components/paginas/pag_cadastro.jsx';
import Conserto30Minutos from './components/paginas/pag_conserto_30_minutos.jsx';
import ConsertoMicroondas from './components/paginas/pag_conserto_microondas.jsx';
import ConsertoForno from './components/paginas/pag_conserto_forno.jsx';
import Chamado from './components/paginas/chamado.jsx';
import ContaCliente from './components/paginas/pag_conta_cliente.jsx';
import Login from './components/paginas/pag_login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// componentização

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    
      <Routes>
        
          <Route path="/" element={
            <Layout> 
              <Inicio 
                url1={require('./Imagens/micro_laranja.png')}
                url2={require('./Imagens/imagem_preta.png')}
                marca="Casa do Microondas"
                descricao="Especialistas em conserto de microondas"
                botao_inicio_1="Conserto em 30 Minutos"
                href1="conserto-30-minutos"
            />
            <Servicos/>
            <Marca/>
            <Contato
              img_fundo={require('./Imagens/retangulo_laranja.png')}
            />
            <Localizacao
              img={require('./Imagens/retangulo_laranja.png')}
              nome_local = "Santa Felicidade"
              endereco="R. Saturnino Miranda, 84 - Santa Felicidade, Curitiba - PR, 82030-320, Brasil"
              icone_whatsapp={require("./Imagens/icone whatsapp.png")}
              num_whatsapp="+55-41 9 8516-3602"
              icone_tel={require("./Imagens/icone de telefone laranja.png")}
              numero="+55-41 3332-8000"
              icone_email={require("./Imagens/icone e-mail.png")}
              email="exemplo@gmail.com"
              icone_relogio={require("./Imagens/icone relogio laranja.png")}
              horario="Seg-Sex - 09:00 às 18:00 Sábado - 09:00 às 13:00"
              maps="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.1415868160857!2d-49.33673338917841!3d-25.40007077748734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce1ae328a748b%3A0x7cfdac29470a291d!2sR.%20Saturnino%20Miranda%2C%2084%20-%20Santa%20Felicidade%2C%20Curitiba%20-%20PR%2C%2082030-320!5e0!3m2!1spt-BR!2sbr!4v1713675766776!5m2!1spt-BR!2sbr" width="600" height="450" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
                
            </Layout>
          }
        />
        <Route path="conta-cliente" element={
          <Layout> 
            <ContaCliente/>
          </Layout>} />

        <Route path="login" element={
        <Layout> 
          <Login/>
        </Layout>} />

        <Route path="cadastro" element={
          <Layout> 
            <Cadastro/>
          </Layout> } /> 
        <Route path="conserto-30-minutos" element={
          <Layout> 
            <Conserto30Minutos />
          </Layout> } />      
        <Route path="conserto-microondas" element={
        <Layout> 
          <ConsertoMicroondas/>
        </Layout> } /> 
        
        <Route path="conserto-forno" element={
        <Layout> 
          <ConsertoForno/>
        </Layout> } />
        <Route path="servico/:id" element={
        <Layout> 
          <Chamado />
        </Layout> } />
      </Routes>
   
    </Router>
);


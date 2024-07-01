import React, { useEffect }  from 'react';
import Header from './header/header';
import Footer from './footer/footer';

function Layout({ children }) {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Header 
      
      marca="Casa do Microondas" 
      logo_cmo={require("../Imagens/logo.jpg")}
      
      inicio_btn="/"
      servicos_btn="pag_servicos"

      pag_cadastro="cadastro"
      pag_conta_cliente="conta-cliente"
      pag_login="login"
      gestao_adm="gestao-adm"
      />
      <main>{children}</main>
      <Footer marca="Casa do Microondas" />
    </>
  );
}

export default Layout;
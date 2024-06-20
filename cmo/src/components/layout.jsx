import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';

function Layout({ children }) {
  return (
    <>
      <Header marca="Casa do Microondas" 
      inicio_btn="/"
      servicos_btn="pag_servicos"
      pag_cadastro="cadastro"
      />
      <main>{children}</main>
      <Footer marca="Casa do Microondas" />
    </>
  );
}

export default Layout;
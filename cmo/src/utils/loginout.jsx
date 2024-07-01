export const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };

  export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('idCliente');
    localStorage.removeItem('permissao');
    window.location.href = '/'; // Redireciona para a página inicial
  }
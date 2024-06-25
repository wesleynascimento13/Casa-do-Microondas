export const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('idCliente');
  window.location.href = '/login'; // Redireciona para a página de login
}
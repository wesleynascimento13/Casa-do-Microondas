import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const handleTokenExpired = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        navigate('/login');
        // Ou exibir uma mensagem indicando a necessidade de login
        // setMensagem('Sessão expirada. Faça login novamente.');
    };

    return (
        <AuthContext.Provider value={{ handleTokenExpired }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
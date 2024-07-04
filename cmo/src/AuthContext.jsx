import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './utils/loginout';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [setMensagem] = useState('');

    const handleTokenExpired = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        setMensagem('Sessão expirada. Faça login novamente.');
        logout();
        navigate('/login');
        
    };

    return (
        <AuthContext.Provider value={{ handleTokenExpired }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
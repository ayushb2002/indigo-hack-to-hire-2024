import React, { createContext, useState, useEffect } from 'react';
import authService from 'services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const login = (username, password) => {
        return authService.login(username, password).then(user => {
            setCurrentUser(user);
            return user;
        });
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    const register = (username, email, password, name) => {
        return authService.register(username, email, password, name).then(user => {
            setCurrentUser(user);
            return user;
        });
    };

    const updateRole = (username, role) => {
        return authService.updateRole(username, role, currentUser.token);
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register, updateRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'context/authContext';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        logout();
        history.push('/login');
    }, [logout, history]);

    return null;
};

export default Logout;

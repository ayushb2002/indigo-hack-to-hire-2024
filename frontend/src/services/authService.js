import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Register a new user
const register = async (username, email, password, name) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
        'username': username,
        'email': email,
        'name': name,
        'password': password,
        'role': 'customer'
    });
    
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login a user
const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
        'username': username,
        'password': password
    });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout the user
const logout = () => {
    localStorage.removeItem('user');
};

// Get current user
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser
};

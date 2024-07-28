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

    if (response.data.role === 'customer')
        {
            const bookings = await axios.get(`${API_URL}/bookings/by-username-all/${response.data.username}`, {}, {
                headers: {
                    'Authorization': `Bearer ${response.data.token}`
                }
            });
            
            localStorage.setItem('bookings', bookings.data);
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

const getCurrentUserBookings = () => {
    return JSON.parse(localStorage.getItem('bookings'));
}

const updateRole = async (username, role, token) => {
    const response = await axios.post(`${API_URL}/auth/update-role`, {
        'username': username,
        'role': role
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}

export default {
    register,
    login,
    logout,
    getCurrentUser,
    updateRole,
    getCurrentUserBookings
};

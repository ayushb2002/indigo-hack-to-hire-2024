import axios from 'axios';

const API_URL = 'http://localhost:5000';

const createBooking = async (username, flight_number, seat_number, token) => {
    const res = await axios.post(`${API_URL}/bookings/create`, {
        'username': username,
        'flight_number': flight_number,
        'seat_number': seat_number
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
};

const searchAllByFlightNumber = async (flight_number, token) => {
    const res = await axios.get(`${API_URL}/bookings/by-flight-all/${flight_number}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    return res.data;
};

const searchPendingByFlightNumber = async (flight_number, token) => {
    const res = await axios.get(`${API_URL}/bookings/by-flight-pending/${flight_number}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    return res.data;
};

const searchAllByUsername = async (username, token) => {
    const res = await axios.get(`${API_URL}/bookings/by-username-all/${username}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    return res.data;
};

const searchPendingByUsername = async (username, token) => {
    const res = await axios.get(`${API_URL}/bookings/by-username-pending/${username}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    return res.data;
};

const updateStatus = async (booking_id, token) => {
    const res = await axios.post(`${API_URL}/bookings/update-status`, {
        'booking_id': booking_id
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}

export default {
    createBooking,
    searchAllByFlightNumber,
    searchAllByUsername,
    searchPendingByFlightNumber,
    searchPendingByUsername,
    updateStatus
};
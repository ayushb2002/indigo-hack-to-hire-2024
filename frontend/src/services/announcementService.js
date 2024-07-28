import axios from "axios";

const API_URL = 'http://localhost:5000';

const notifications = async (flight_number, subject, message, token) => {
    const res = await axios.post(`${API_URL}/notifications/send`, {
        "flight_number": flight_number,
        "message": message,
        "subject": subject
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}

const broadcast = async (subject, message, token) => {
    const res = await axios.post(`${API_URL}/notifications/broadcast`, {
        "message": message,
        "subject": subject
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}

export default {
    notifications,
    broadcast
}
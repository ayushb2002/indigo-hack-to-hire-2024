import axios from "axios";

const API_URL = 'http://localhost:5000';

const createFlight = async (flight_number, departure, destination, departure_time, arrival_time, token) => {
    const res = await axios.post(`${API_URL}/flights/create`, {
        "flight_number": flight_number,
        "departure": departure,
        "destination": destination,
        "departure_time": departure_time,
        "arrival_time": arrival_time
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}

const search_by_departure = async (departure) => {
    const res = await axios.get(`${API_URL}/flights/search_by_departure/${departure}`);
    return res.data;
}

const search_by_destination = async (destination) => {
    const res = await axios.get(`${API_URL}/flights/search_by_arrival/${destination}`);
    return res.data;
}

const search_by_flight_number = async (flight_number) => {
    const res = await axios.get(`${API_URL}/flights/search_by_arrival/${flight_number}`);
    return res.data;
}

export default {
    createFlight,
    search_by_departure,
    search_by_destination,
    search_by_flight_number
}
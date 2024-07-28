import React, { createContext, useState, useEffect } from 'react';
import authService from 'services/authService';
import flightService from 'services/flightService';

const FlightContext = createContext();

const FlightProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const createFlight = (flight_number, destination, departure, departure_time, arrival_time) => {
        return flightService.createFlight(flight_number, destination, departure, departure_time, arrival_time, currentUser.token);
    };

    const search_by_departure = (departure) => {
        return flightService.search_by_departure(departure);
    };

    const search_by_arrival = (arrival) => {
        return flightService.search_by_arrival(arrival);
    };

    const search_by_flight_number = (flightNumber) => {
        return flightService.search_by_flight_number(flightNumber);
    };

    return (
        <FlightContext.Provider value={{ currentUser, createFlight, search_by_arrival, search_by_departure, search_by_flight_number }}>
            {children}
        </FlightContext.Provider>
    );
}

export { FlightContext, FlightProvider };
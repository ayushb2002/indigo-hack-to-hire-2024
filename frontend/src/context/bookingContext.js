import React, { createContext, useState, useEffect } from 'react';
import authService from 'services/authService';
import bookingService from 'services/bookingService';

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const createBooking = (username, flight_number, seat_number) => {
        return bookingService.createBooking(username, flight_number, seat_number, currentUser.token);
    };

    const searchAllByFlightNumber = (flight_number) => {
        return bookingService.searchAllByFlightNumber(flight_number, currentUser.token);
    };

    const searchPendingByFlightNumber = (flight_number) => {
        return bookingService.searchPendingByFlightNumber(flight_number, currentUser.token);
    };

    const searchAllByUsername = (username) => {
        return bookingService.searchAllByUsername(username, currentUser.token);
    };

    const searchPendingByUsername = (username) => {
        return bookingService.searchPendingByUsername(username, currentUser.token);
    };

    const updateStatus = (booking_id) => {
        return bookingService.updateStatus(booking_id, currentUser.token);
    }

    return (
        <BookingContext.Provider value={{ currentUser, createBooking, searchAllByFlightNumber, searchAllByUsername, searchPendingByFlightNumber, searchPendingByUsername, updateStatus }}>
            {children}
        </BookingContext.Provider>
    );
}

export { BookingContext, BookingProvider };
import React, { createContext, useState, useEffect } from 'react';
import authService from 'services/authService';
import announcementService from 'services/announcementService';

const AnnouncementContext = createContext();

const AnnouncementProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const notifications = (flight_number, subject, message) => {
        return announcementService.notifications(flight_number, subject, message, currentUser.token);
    };

    const broadcast = (subject, message) => {
        return announcementService.broadcast(subject, message, currentUser.token);
    };

    return (
        <AnnouncementContext.Provider value={{ currentUser, notifications, broadcast }}>
            {children}
        </AnnouncementContext.Provider>
    );
}

export { AnnouncementContext, AnnouncementProvider };
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import PropTypes from "prop-types";

const SOCKET_SERVER_URL = 'http://localhost:4000';

const NotificationHandler = ({ color, flightNumberData }) => {
    const [notificationData, setNotificationData] = useState([]);

    const addNotificationData = (newNotificationData) => {
        setNotificationData(oldNotificationData => {
            // Add new data and sort by timestamp
            const updatedData = [...oldNotificationData, newNotificationData];
            return updatedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        });
    };

    useEffect(() => {
        const socket = io(SOCKET_SERVER_URL);

        // Listen for cached notifications
        socket.on("cachedNotifications", (cachedNotifications) => {
            cachedNotifications
                .filter(nfn => flightNumberData.includes(nfn.flight_number))
                .forEach(nfn => addNotificationData(nfn));
        });

        socket.on('notification', (data) => {
            console.log('Notification received:', data);
            if (flightNumberData.includes(data.flight_number)) {
                addNotificationData(data);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [flightNumberData]);

    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Notifications and Updates
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Timestamp
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Flight Number
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Subject
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Message
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {notificationData && notificationData.map(notificationItem => (
                                <tr key={notificationItem._id}>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                        {new Date(notificationItem.timestamp).toLocaleString()}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                        {notificationItem.flight_number}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                        {notificationItem.subject}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                        {notificationItem.message}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default NotificationHandler;

NotificationHandler.defaultProps = {
    color: "light",
};

NotificationHandler.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

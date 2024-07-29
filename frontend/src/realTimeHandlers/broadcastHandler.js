import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import PropTypes from "prop-types";

const SOCKET_SERVER_URL = 'http://localhost:4000';

const BroadcastHandler = ({ color }) => {
    const [broadcastData, setBroadcastData] = useState([]);

    const addBroadcastData = (newBroadcastData) => {
        setBroadcastData(oldBroadcastData => [...oldBroadcastData, newBroadcastData]);
    };

    useEffect(() => {
        const socket = io(SOCKET_SERVER_URL);
    
        // Listen for cached broadcasts
        socket.on("cachedBroadcasts", (cachedBroadcasts) => {
            cachedBroadcasts.forEach(bdct => {
                addBroadcastData(bdct);
            })
        });

        socket.on('broadcast', (data) => {
            console.log('Broadcast received:', data);
            addBroadcastData(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // Sort broadcastData by timestamp
    const sortedBroadcastData = [...broadcastData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    console.log(sortedBroadcastData);
    return (
        <>
            <div className='flex justify-center items-center content-center h-full'>
                <div className='lg:w-12/12 px-4'>
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
                            General Channel
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
                        {sortedBroadcastData.map(broadcastItem => (
                            <tr key={broadcastItem._id}>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                    {new Date(broadcastItem.timestamp).toLocaleString()}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                    {broadcastItem.subject}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                    {broadcastItem.message}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};

BroadcastHandler.defaultProps = {
    color: "light",
};

BroadcastHandler.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

export default BroadcastHandler;

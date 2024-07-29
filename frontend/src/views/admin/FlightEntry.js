import { AuthContext } from "context/authContext";
import { FlightContext } from "context/flightContext";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

export default function FlightEntry() {

    const { currentUser } = useContext(AuthContext);
    const { createFlight } = useContext(FlightContext);
    const history = useHistory();

    const handleFlightEntry = (e) => {
        e.preventDefault();
        const flightNumber = document.getElementById('staffFlightNumber').value;
        const departure = document.getElementById('staffDeparture').value;
        const arrival = document.getElementById('staffArrival').value;
        const departureTime = document.getElementById('staffDepartureTime').value;
        const arrivalTime = document.getElementById('staffArrivalTime').value;

        createFlight(flightNumber, arrival, departure, departureTime, arrivalTime).then((res) => {
            console.log(res);
            toast.success(res.message);
            document.getElementById('staffFlightNumber').value = "";
            document.getElementById('staffDeparture').value = "";
            document.getElementById('staffArrival').value = "";
            document.getElementById('staffDepartureTime').value = "";
            document.getElementById('staffArrivalTime').value = "";
        }).catch((err) => {
            console.error(err);
            toast.error('Could not register the flight!');
            document.getElementById('staffFlightNumber').value = "";
            document.getElementById('staffDeparture').value = "";
            document.getElementById('staffArrival').value = "";
            document.getElementById('staffDepartureTime').value = "";
            document.getElementById('staffArrivalTime').value = "";
        })
    };

    useEffect(() => {
        if (!currentUser || currentUser.role !== "staff") {
            history.push('/dashboard');
        }
    }, [currentUser, history]);
    
  return (
    <>
      <div className="flex flex-wrap">
      <div className="lg:w-4/12 px-4"></div>
          <div className="lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h4 className="text-blueGray-500 text-lg font-bold">
                      Flight Information
                    </h4>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleFlightEntry}>
                  
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Flight Number
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Flight Number"
                        id="staffFlightNumber"
                      />
                    </div>
                    
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Arrival
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Departure Location"
                        id="staffDeparture"
                      />
                    </div>
                    
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Departure
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Arrival Location"
                        id="staffArrival"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Departure Time
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Format - yyyymmdd hhmm"
                        id="staffDepartureTime"
                      />
                    </div>
                    
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Arrival Time
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Format - yyyymmdd hhmm"
                        id="staffArrivalTime"
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          </div>
          <div className="lg:w-4/12 px-4"></div>
        </div>
    </>
  );
}

import FlightResults from "components/flightResults";
import { FlightContext } from "context/flightContext";
import React, { useContext, useState } from "react";


export default function SearchFlights() {

    const { search_by_arrival, search_by_departure, search_by_flight_number } = useContext(FlightContext);
    const [flightNumberResult, setFlightNumberResult] = useState([]);
    const [departureResult, setDepartureResult] = useState([]);
    const [arrivalResult, setArrivalResult] = useState([]);


    const handleFlightSearch = (e) => {
        e.preventDefault();
        const flightNumber = document.getElementById('flightNumber');
        const departure = document.getElementById('departure');
        const arrival = document.getElementById('arrival');

        if (flightNumber.value !== '')
        {
          setArrivalResult([]);
          setDepartureResult([]);
            search_by_flight_number(flightNumber.value).then((res) => {
                res = JSON.parse(res['flights']);
                setFlightNumberResult(res);
            }).catch((err) => { 
                console.error(err);
            })
        }

        if (arrival.value !== '')
        {
          setFlightNumberResult([]);
          setDepartureResult([]);
            search_by_arrival(arrival.value).then((res) => {
                res = JSON.parse(res['flights']);
                setArrivalResult(res);
            }).catch((err) => { 
                console.error(err);
            })
        }

        if (departure.value !== '')
        {
          setFlightNumberResult([]);
          setArrivalResult([]);
                search_by_departure(departure.value).then((res) => {
                    res = JSON.parse(res['flights']);
                    setDepartureResult(res);
                }).catch((err) => { 
                    console.error(err);
                })
        }

        flightNumber.value = "";
        departure.value = "";
        arrival.value = "";
    }

  return (
    <>
      <div className="flex flex-wrap">

      <div className="lg:w-4/12 px-4"></div>
          <div className="lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h4 className="text-blueGray-500 text-lg font-bold">
                      Search Flights
                    </h4>
                    <h6>
                        Use only one filter
                    </h6>          
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleFlightSearch}>
                  
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
                        id="flightNumber"
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
                        placeholder="Departure city"
                        id="departure"
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
                        placeholder="Arrival city"
                        id="arrival"
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          </div>
          <div className="lg:w-4/12 px-4"></div>
        </div>
        <div className="flex justify-center items-center content-center h-full">
              <div className="lg:w-12/12 px-4">
                <FlightResults color={"light"} flightData={flightNumberResult} arrivalData={arrivalResult} departureData={departureResult} />
              </div>
        </div>
    </>
  );
}

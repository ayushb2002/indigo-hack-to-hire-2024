import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NotificationHandler from "realTimeHandlers/notificationHandler";
import axios from "axios";
import WeatherCard from "./weatherCard";

export default function MyBookings({ color, data }) {
  const [flightNumberStore, setFlightNumberStore] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const flightNumbers = [];
    if (data) {
      data.forEach(item => {
        flightNumbers.push(item.flight_id.flight_number);
      });
      setFlightNumberStore(flightNumbers);
    }
  }, [data]); 

  const loadWeatherReport = async (city) => {
    try {
      let url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&days=2`;
      const response = await axios.get(url);
      const res = response["data"];
      var requiredData = {
        "city": city,
        "today": {
          "date": res["forecast"]["forecastday"][0]["date"],
          "maxtemp_c": res["forecast"]["forecastday"][0]["day"]["maxtemp_c"],
          "mintemp_c": res["forecast"]["forecastday"][0]["day"]["mintemp_c"],
          "maxwind_kph": res["forecast"]["forecastday"][0]["day"]["mintemp_c"],
          "condition": res["forecast"]["forecastday"][0]["day"]["condition"]["text"],
          "icon": res["forecast"]["forecastday"][0]["day"]["condition"]["icon"],
          "total_precipitation_mm": res["forecast"]["forecastday"][0]["day"]["totalprecip_mm"],
          "humidity": res["forecast"]["forecastday"][0]["day"]["avghumidity"]
        },
        "tomorrow": {
          "date": res["forecast"]["forecastday"][1]["date"],
          "maxtemp_c": res["forecast"]["forecastday"][1]["day"]["maxtemp_c"],
          "mintemp_c": res["forecast"]["forecastday"][1]["day"]["mintemp_c"],
          "maxwind_kph": res["forecast"]["forecastday"][1]["day"]["mintemp_c"],
          "condition": res["forecast"]["forecastday"][1]["day"]["condition"]["text"],
          "icon": res["forecast"]["forecastday"][1]["day"]["condition"]["icon"],
          "total_precipitation_mm": res["forecast"]["forecastday"][1]["day"]["totalprecip_mm"],
          "humidity": res["forecast"]["forecastday"][1]["day"]["avghumidity"]
        }
      }

      setWeatherData(requiredData); 
      console.log(requiredData);
    }
    catch (err){
      console.error(err);
    }
  };

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
                Booking Details
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
                  Departure
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Arrival
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Seat Number
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Booking Status
                </th>
              </tr>
            </thead>
            <tbody>
            {data && data.map(items => (
              <tr key={items._id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      {items.flight_id.flight_number}
                  </th>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <a href="#pablo" onClick={(e) => {
                          e.preventDefault();
                          loadWeatherReport(items.flight_id.departure);
                      }}>
                          {items.flight_id.departure} | {items.flight_id.departure_time}
                      </a>
                  </th>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <a href="#pablo" onClick={(e) => {
                          e.preventDefault();
                          loadWeatherReport(items.flight_id.destination);
                      }}>
                          {items.flight_id.destination} | {items.flight_id.arrival_time}
                      </a>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      {items.seat_number}
                  </td>
                  <td className="uppercase border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      {items.booking_status}
                  </td>
              </tr>
            ))}

            </tbody>
          </table>
        </div>
      </div>
      {Object.keys(flightNumberStore).length !== 0 && (
        <NotificationHandler flightNumberData={flightNumberStore} />
      )}

      {Object.keys(weatherData).length!==0 && (
        <WeatherCard city={weatherData.city} todayForecast={weatherData.today} tomorrowForecast={weatherData.tomorrow} />
      )}
    </>
  );
}

MyBookings.defaultProps = {
  color: "light",
};

MyBookings.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

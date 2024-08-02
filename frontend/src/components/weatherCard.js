import { AuthContext } from "context/authContext";
import React, { useContext, useEffect } from "react";

// components

export default function WeatherCard({ city, todayForecast, tomorrowForecast }) {

  const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) {
            window.location.href = "/login";
        }
    }, [currentUser]);
    
    
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Weather Report</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              { city }
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <ul>
                    <li>Date - { todayForecast.date }</li>
                    <li>Maximum temperature - {todayForecast.maxtemp_c} C</li>
                    <li>Minimum temperature - {todayForecast.mintemp_c} C</li>
                    <li>Wind Speed - {todayForecast.maxwind_kph} KPH</li>
                    <li>Average Humidity - {todayForecast.humidity}</li>
                    <li>Precipitation - {todayForecast.total_precipitation_mm} mm</li>
                    <li>Condition - {todayForecast.condition}</li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <ul>
                        <li>Date - { tomorrowForecast.date }</li>
                        <li>Maximum temperature - {tomorrowForecast.maxtemp_c} C</li>
                        <li>Minimum temperature - {tomorrowForecast.mintemp_c} C</li>
                        <li>Wind Speed - {tomorrowForecast.maxwind_kph} KPH</li>
                        <li>Average Humidity - {tomorrowForecast.humidity}</li>
                        <li>Precipitation - {tomorrowForecast.total_precipitation_mm} mm</li>
                        <li>Condition - {tomorrowForecast.condition}</li>
                    </ul>
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
        </div>
      </div>
    </>
  );
}

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
              { city } - Forecast
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <ul>
                    <li><span class="font-bold">Date</span> - { todayForecast.date }</li>
                    <li><span class="font-bold">Maximum temperature</span> - {todayForecast.maxtemp_c} C</li>
                    <li><span class="font-bold">Minimum temperature</span> - {todayForecast.mintemp_c} C</li>
                    <li><span class="font-bold">Wind Speed</span> - {todayForecast.maxwind_kph} KPH</li>
                    <li><span class="font-bold">Average Humidity</span> - {todayForecast.humidity}</li>
                    <li><span class="font-bold">Precipitation</span> - {todayForecast.total_precipitation_mm} mm</li>
                    <li><span class="font-bold">Condition</span> - {todayForecast.condition}</li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <ul>
                        <li><span class="font-bold">Date</span> - { tomorrowForecast.date }</li>
                        <li><span class="font-bold">Maximum temperature</span> - {tomorrowForecast.maxtemp_c} C</li>
                        <li><span class="font-bold">Minimum temperature</span> - {tomorrowForecast.mintemp_c} C</li>
                        <li><span class="font-bold">Wind Speed</span> - {tomorrowForecast.maxwind_kph} KPH</li>
                        <li><span class="font-bold">Average Humidity</span> - {tomorrowForecast.humidity}</li>
                        <li><span class="font-bold">Precipitation</span> - {tomorrowForecast.total_precipitation_mm} mm</li>
                        <li><span class="font-bold">Condition</span> - {tomorrowForecast.condition}</li>
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

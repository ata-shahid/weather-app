"use client";

/* Libraries */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format, fromUnixTime, parseISO } from "date-fns";

/* Components */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Weatherimage from "@/components/Weatherimage";
import Container from "@/components/Container";
import Widgets from "@/components/Widgets";

/* Utilities */
import { celsiusConverter } from "@/utils/celsiusConverter";
import { weatherIcon } from "@/utils/weathericon";
import { kilometerConverter } from "@/utils/kilometerConverter";
import { speedConverter } from "@/utils/speedConverter";

import { WeatherData } from "@/types/types";
import Searchbar from "@/components/SearchBar";
import Link from "next/link";

export default function Forecast() {
  const router = useRouter();
  const { lat, lon, index, city } = router.query;
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true); // Loading state

  useEffect(() => {
    if (lat && lon) {
      const forecastIndex = index ? Number(index) : 0;
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch weather data");
          }
          return res.json();
        })
        .then((data) => {
          setWeatherData(data);
          setIsPending(false);
        })
        .catch((error) => {
          setError(error);
          setIsPending(false);
        });
    }
  }, [lat, lon, index]);

  if (isPending) {
    return (
      <div className="flex items-center min-h-screen justify-center animate-bounce">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  const safeIndex = Number(index ?? 0);
  const wData = weatherData?.list[safeIndex * 8];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center">
        <div>
          <Searchbar />
        </div>
        {/* Day and Date */}
        <div className="bg-white border rounded-md shadow-sm mt-5 py-2 w-[500px] max-w-full flex flex-col mx-auto">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-xl justify-center items-end">
              <p>{format(parseISO(wData?.dt_txt ?? ""), "EEEE")}</p>
              <p>,{format(parseISO(wData?.dt_txt ?? ""), "dd.MM.yyyy")}</p>
            </h2>
          </div>
        </div>

        {/* weather basic widget */}
        <div className="bg-white border rounded-md shadow-sm mt-5 p-4 w-[500px] max-w-full flex flex-col mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-semibold">{city}</p>
              <p className="mt-1">
                {celsiusConverter(wData?.main.temp ?? 0)}°C
              </p>
              <p className="mt-1 text-xs">
                Feels Like: {celsiusConverter(wData?.main.feels_like ?? 0)}°C
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 -mt-2">
                <Weatherimage
                  icon={weatherIcon(
                    wData?.weather[0].icon ?? "",
                    wData?.dt_txt ?? ""
                  )}
                />
              </div>
              <p className="text-sm mt-2 capitalize ">
                {wData?.weather[0].description}
              </p>
            </div>
          </div>
          <p className="text-xs mt-1 gap-2 flex">
            <span>Max: {celsiusConverter(wData?.main.temp_max ?? 0)}°C</span>
            <span>Min: {celsiusConverter(wData?.main.temp_min ?? 0)}°C</span>
          </p>
        </div>

        {/* 24H in 3H steps Weather data */}
        <div className="bg-white container border pt-4 px-4 rounded-md mx-auto flex gap-4 pb-4 items-center mt-5 overflow-x-auto w-full md:w-[800px]">
          {weatherData?.list.slice(safeIndex * 8, (safeIndex * 8) + 8).map((item, i) => ( // scrolling in Mobile Version ;)
              <div
                key={i}
                className="flex flex-col justify-between gap-1 items-center text-xs font-medium min-w-[60px] md:min-w-[80px]"
              >
                <p className="whitespace-nowrap">
                  {format(parseISO(item.dt_txt), "HH:mm")}
                </p>
                <Weatherimage
                  icon={weatherIcon(item.weather[0].icon, item.dt_txt)}
                />
                <p>{celsiusConverter(item?.main.temp ?? 0)}°C</p>
              </div>
            )
          )}
        </div>

        {/* additional weather widgets */}
        <div className="flex justify-center mt-4 mb-4">
          <Container>
            <Widgets
              sunrise={format(
                fromUnixTime(weatherData?.city.sunrise ?? 1719119835),
                "HH:mm"
              )}
              sunset={format(
                fromUnixTime(weatherData?.city.sunset ?? 1719119835),
                "HH:mm"
              )}
              airPressure={`${wData?.main.pressure} hPa`}
              seaLevel={`${wData?.main.sea_level} hPa`}
              visibility={kilometerConverter(wData?.visibility ?? 0)}
              humidity={`${wData?.main.humidity}%`}
              windSpeed={speedConverter(wData?.wind.speed ?? 0)}
              windGust={speedConverter(wData?.wind.gust ?? 0)}
            />
          </Container>
        </div>
      </main>
      <Footer />
    </div>
  );
}

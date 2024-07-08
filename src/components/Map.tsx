'use client'

import React from "react";
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo } from 'react';

interface MapProps {
  lat: number;
  lon: number;
}

const Map = ({ lat, lon }: MapProps) => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const weatherLayers = useMemo(() => [
    { name: "Clouds", layer: "clouds_new" },
    { name: "Precipitation", layer: "precipitation_new" },
    { name: "Pressure", layer: "pressure_new" },
    { name: "Wind", layer: "wind_new" },
    { name: "Temperature", layer: "temp_new" },
  ], []);

  useEffect(() => {
    if (!apiKey) {
      console.error("API key is not set");
      return;
    }

    weatherLayers.forEach(({ name, layer }) => {
      const url = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`;
      
    });
  }, [apiKey, weatherLayers]);

  if (!apiKey) {
    return <div>Error: API key is not set.</div>;
  }

  const minZoom = 2; // Setting a minimum zoom level to prevent excessive zoom-out
  

  return (
    <MapContainer center={[lat, lon]} zoom={12} minZoom={minZoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      <LayersControl position="topright">
        {weatherLayers.map((weatherLayer) => (
          <LayersControl.Overlay key={weatherLayer.layer} name={weatherLayer.name}>
            <TileLayer
              url={`https://tile.openweathermap.org/map/${weatherLayer.layer}/{z}/{x}/{y}.png?appid=${apiKey}`}
              attribution='&copy; <a href="https://openweathermap.org">OpenWeatherMap</a> contributors'
            />
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
};

export default Map;

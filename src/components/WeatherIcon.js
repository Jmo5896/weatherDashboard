import React from "react";

export default function WeatherIcon({ icon }) {
  return (
    <img
      src={`https://openweathermap.org/img/w/${icon}.png`}
      alt="weather icon"
    />
  );
}

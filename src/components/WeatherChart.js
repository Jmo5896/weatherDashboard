import React from "react";
import Plot from "react-plotly.js";

export default function WeatherChart({ data }) {
  const cleanData = {
    x: data.map((obj) => new Date(obj.dt * 1000).getHours()),
    y: data.map((obj) => obj.temp),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "red" },
  };
  console.log(data.sort((a, b) => a.dt - b.dt));
  return (
    <Plot
      data={[
        cleanData,
        // { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
      ]}
      layout={{
        // width: 320,
        // height: 240,
        title: "Temp chart",
      }}
    />
  );
}

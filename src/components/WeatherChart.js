import React, { useRef, useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Col, Row, Button } from "react-bootstrap";

export default function WeatherChart({ data }) {
  const [width, setWidth] = useState(320);
  const [chart, setChart] = useState({
    text: "temp",
    yAxis: "Degrees, Fahrenheit",
  });
  const [cleanData, setCleanData] = useState({
    x: data.map((obj) => new Date(obj.dt * 1000)),
    y: data.map((obj) => obj.temp),
  });
  const chartRef = useRef();
  //   const cleanData = {
  //     x: data.map((obj) => new Date(obj.dt * 1000)),
  //     y: data.map((obj) => obj.temp),
  //   };
  //   console.log(data);
  useEffect(() => {
    setWidth(chartRef.current.offsetWidth - 80);
    // console.log("width", chartRef.current ? chartRef.current.offsetWidth : 0);
  }, [chartRef.current]);

  const handleClick = (e) => {
    const cd = { ...cleanData };
    const val = JSON.parse(e.target.value);
    // console.log(val);
    cd.y = data.map((obj) => obj[val.text]);
    setCleanData(cd);
    setChart(val);
  };

  return (
    <Col xs={8} ref={chartRef}>
      <div className="glass">
        <Row>
          <Col xs={2}>
            <Button
              variant={chart.text === "temp" ? "dark" : "outline-dark"}
              size="sm"
              onClick={handleClick}
              value={JSON.stringify({
                text: "temp",
                yAxis: "Degrees, Fahrenheit",
              })}
            >
              Temp
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              variant={chart.text === "humidity" ? "dark" : "outline-dark"}
              size="sm"
              onClick={handleClick}
              value={JSON.stringify({
                text: "humidity",
                yAxis: "Percentage (%)",
              })}
            >
              Humidity
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              variant={chart.text === "wind_speed" ? "dark" : "outline-dark"}
              size="sm"
              onClick={handleClick}
              value={JSON.stringify({
                text: "wind_speed",
                yAxis: "Miles per Hour (mph)",
              })}
            >
              Wind
            </Button>
          </Col>
        </Row>
        <Plot
          data={[
            {
              ...cleanData,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "antiquewhite" },
            },
          ]}
          layout={{
            paper_bgcolor: "rgba(122, 170, 215, 0)",
            plot_bgcolor: "rgba(122, 170, 215, 0.0)",
            width: width,
            // width: 320,
            // height: 240,
            title: {
              text: chart.text.toUpperCase(),
              font: {
                color: "antiquewhite",
              },
            },
            yaxis: {
              title: chart.yAxis,
              color: "antiquewhite",
              gridcolor: "black",
            },
            xaxis: {
              title: "Date, Hour",
              color: "antiquewhite",
              gridcolor: "black",
            },
          }}
        />
      </div>
    </Col>
  );
}

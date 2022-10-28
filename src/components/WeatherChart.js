import React, { useRef, useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Col, Row, Button } from "react-bootstrap";

export default function WeatherChart({ data }) {
  const [width, setWidth] = useState(320);
  const [chart, setChart] = useState("temp");
  const chartRef = useRef();
  const cleanData = {
    x: data.map((obj) => new Date(obj.dt * 1000)),
    y: data.map((obj) => obj.temp),
  };

  useEffect(() => {
    setWidth(chartRef.current.offsetWidth - 80);
    // console.log("width", chartRef.current ? chartRef.current.offsetWidth : 0);
  }, [chartRef.current]);

  const handleClick = (e) => {
    const val = e.target.value;
    setChart(val);
  };

  return (
    <Col xs={8} ref={chartRef}>
      <div className="glass">
        <Row>
          <Col xs={2}>
            <Button
              variant={chart === "temp" ? "dark" : "outline-dark"}
              size="sm"
              onClick={handleClick}
              value="temp"
            >
              Temp
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              variant={chart === "humidity" ? "dark" : "outline-dark"}
              size="sm"
              onClick={handleClick}
              value="humidity"
            >
              Humidity
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              variant={chart === "wind" ? "dark" : "outline-dark"}
              size="sm"
              onClick={handleClick}
              value="wind"
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
              text: "Daily Temp Chart",
              font: {
                color: "antiquewhite",
              },
            },
            yaxis: {
              title: "Degrees, Fahrenheit",
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

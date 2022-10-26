import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";

import API from "../services/api";

// https://openweathermap.org/img/w/${weather.weather[0].icon}.png

export default function Dashboard({ partA, part4 }) {
  const [content, setContent] = useState();
  const [coor, setCoor] = useState({});
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState(API.getStates());
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const x = API.parser(partA, part4);
      const response = await API.getWeather({
        api_key: x,
        lat: coor.lat,
        lon: coor.lon,
      });
      console.log(response.data);
      setContent(response.data);
      isLoading(false);
    };

    if (loading) {
      fetchData();
    }
  }, [loading, coor, partA, part4]);

  const onStateSelection = (e) => {
    const val = e.value;
    const currentCities = API.getCities(val);
    setCities(currentCities);
    // console.log(currentCities);
  };

  const onCitySelection = (e) => {
    setCoor(e.value);
    isLoading(true);
  };

  return (
    <div className="dashboard">
      <Container>
        <Row>
          <Col md={3}>
            <div className="glass">
              <h4>Find Your Weather.</h4>
              <h5> Select State: </h5>
              <Select
                name="state"
                onChange={onStateSelection}
                options={states}
              />
              {cities.length > 0 && (
                <>
                  <h5> Select City: </h5>
                  <Select
                    name="city"
                    onChange={onCitySelection}
                    options={cities}
                  />
                </>
              )}
            </div>
          </Col>
          <Col md={9}>
            <Row>
              <Col xs={12}>
                <div className="glass">
                  {content && (
                    <>
                      <h4>
                        Current Weather{" "}
                        <img
                          src={`https://openweathermap.org/img/w/${content.current.weather[0].icon}.png`}
                          alt="weather icon"
                        />
                      </h4>
                      <h5>Temperature: {content.current.temp}° F</h5>
                      <h5>Wind: {content.current.wind_speed} mph</h5>
                      <h5>Humidity: {content.current.humidity}%</h5>
                      <h5>UV Index: {content.current.uvi}</h5>
                    </>
                  )}
                </div>
              </Col>
              <Col xs={12}>
                <div className="glass">
                  <h4>5 Day Forecast</h4>
                  <h5>UNDER CONSTRUCTION</h5>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

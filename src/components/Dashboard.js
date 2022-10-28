import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";

import WeatherIcon from "./WeatherIcon";
import WeatherCard from "./WeatherCard";
import WeatherChart from "./WeatherChart";
import API from "../services/api";

import load from "../images/loading.gif";

const customStyles = {
  option: (provided) => ({
    ...provided,
    height: "100%",
    color: "black",
    paddingTop: "3px",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 2,
  }),
};

export default function Dashboard({ partA, part4 }) {
  const [content, setContent] = useState(null);
  const [coor, setCoor] = useState({});
  const [cities, setCities] = useState([]);
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
  };

  const onCitySelection = (e) => {
    // console.log(e);
    setCoor({ ...e.value, city: e.label.split(", ")[0] });
    setContent(null);
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
                menuPortalTarget={document.body}
                styles={customStyles}
                name="state"
                onChange={onStateSelection}
                options={API.getStates()}
              />
              {cities.length > 0 && (
                <>
                  <h5> Select City: </h5>
                  <Select
                    menuPortalTarget={document.body}
                    styles={customStyles}
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
              <Col xs={6}>
                <div className="glass">
                  {content ? (
                    <>
                      <h4>
                        Current Weather for {coor.city}
                        <WeatherIcon icon={content.current.weather[0].icon} />
                      </h4>
                      <h5>Date: {API.dateFormater(content.current.dt)}</h5>
                      <h5>Temperature: {content.current.temp}° F</h5>
                      <h5>Wind: {content.current.wind_speed} mph</h5>
                      <h5>Humidity: {content.current.humidity}%</h5>
                      <h5>UV Index: {content.current.uvi}</h5>
                    </>
                  ) : (
                    <h4>Pick a city to see the weather.</h4>
                  )}
                  {loading && <img src={load} alt="loading gif" />}
                </div>
              </Col>
              {content && (
                <Col xs={6}>
                  <div className="glass">
                    <WeatherChart data={content.hourly.slice(0, 24)} />
                  </div>
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={12}>
            <div className="glass">
              <Row>
                {content ? (
                  <>
                    <h4>5 Day Forecast</h4>
                    {content.daily.slice(1, 6).map((obj, i) => (
                      <Col key={i}>
                        <WeatherCard
                          icon={obj.weather[0].icon}
                          date={API.dateFormater(obj.dt)}
                          temp={obj.temp.day}
                          wind={obj.wind_speed}
                          humidity={obj.humidity}
                        />
                      </Col>
                    ))}
                  </>
                ) : (
                  <Col xs={12}>
                    <h4>Pick a city to see the forecast.</h4>
                  </Col>
                )}
                {loading && (
                  <Col xs={12}>
                    <img src={load} alt="loading gif" />
                  </Col>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import star from "bootstrap-icons/icons/star.svg";
import favStar from "bootstrap-icons/icons/star-fill.svg";

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
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteCities") || "{}")
  );
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const x = API.parser(partA, part4);
      const response = await API.getWeather({
        api_key: x,
        lat: coor.lat,
        lon: coor.lon,
      });
      // content.current.weather[0].icon
      // https://openweathermap.org/img/w/${icon}.png
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = `https://openweathermap.org/img/w/${response.data.current.weather[0].icon}.png`;

      // console.log(response.data);
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

  const onFavClick = (e) => {
    const currentCity = e.target.textContent;
    const currentCoord = JSON.parse(e.target.value);
    setCoor({ ...currentCoord, city: currentCity });
    setContent(null);
    isLoading(true);
  };

  const handleFavorite = (e) => {
    const searched = { ...favorites };
    const val = e.target.dataset.value;
    console.log(val);
    searched[val].fav = !searched[val].fav;
    const newFavList = {};
    for (const city in searched) {
      if (searched[city].fav) {
        newFavList[city] = searched[city];
      }
    }
    localStorage.setItem("favoriteCities", JSON.stringify(newFavList));
    setFavorites(searched);
  };

  const onCitySelection = (e) => {
    // console.log(e);
    const searched = { ...favorites };
    const currentCity = e.label.split(", ")[0];
    if (e.value) {
      searched[currentCity] = searched[currentCity] || {
        coor: { ...e.value },
        fav: false,
      };
      setFavorites(searched);
      setCoor({ ...e.value, city: currentCity });
      setContent(null);
      isLoading(true);
    }
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
              <h5>Searched Cities: </h5>
              <ul
                style={{
                  listStyle: "none",
                  // overflowY: "scroll",
                  // overflow: "auto",
                  height: "100%",
                  width: "100%",
                }}
              >
                {Object.keys(favorites).length > 0 &&
                  Object.entries(favorites).map(([city, info], i) => (
                    <li key={i} className="pb-1">
                      <img
                        className="fav-icon"
                        onClick={handleFavorite}
                        data-value={city}
                        src={info.fav ? favStar : star}
                        alt="selection icon"
                      />
                      <Button
                        variant={info.fav ? "success" : "secondary"}
                        size="sm"
                        value={JSON.stringify(info.coor)}
                        onClick={onFavClick}
                      >
                        {city}
                      </Button>
                    </li>
                  ))}
              </ul>
            </div>
          </Col>
          <Col md={9}>
            <Row>
              <Col xs={4}>
                <div className="glass">
                  {content ? (
                    <>
                      <h4>Current Weather:</h4>
                      <h4>
                        {coor.city}
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
              {content && <WeatherChart data={content.hourly.slice(0, 24)} />}
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

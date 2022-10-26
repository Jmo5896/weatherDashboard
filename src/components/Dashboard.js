import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";

import API from "../services/api";

export default function Dashboard({ partA, part4 }) {
  const [content, setContent] = useState({});
  const [coor, setCoor] = useState({
    lat: 39.31,
    lon: -74.5,
  });
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState(API.getStates());
  const [loading, isLoading] = useState(true);

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
                <div className="glass">current weather</div>
              </Col>
              <Col xs={12}>
                <div className="glass">5 day forecast</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

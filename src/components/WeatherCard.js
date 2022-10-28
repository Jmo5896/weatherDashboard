import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import WeatherIcon from "./WeatherIcon";

export default function WeatherCard({ icon, date, temp, wind, humidity }) {
  return (
    <Card bg="dark">
      <Card.Body>
        <Card.Title>{date}</Card.Title>
        <WeatherIcon icon={icon} />
        <ListGroup variant="flush">
          <ListGroup.Item>Temp: {temp}° F</ListGroup.Item>
          <ListGroup.Item>Wind: {wind} mph</ListGroup.Item>
          <ListGroup.Item>Humidity: {humidity}%</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

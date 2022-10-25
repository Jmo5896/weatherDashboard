import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Toggle({ switchBackground }) {
  const handleClick = (e) => {
    const val = e.target.value;
    switchBackground(val);
  };
  return (
    <div className="toggle rounded-4">
      <Row>
        <Col xs={12}>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={handleClick}
            value="storm"
          >
            stormy
          </Button>
        </Col>
        <Col xs={12}>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={handleClick}
            value="sunny"
          >
            sunny
          </Button>
        </Col>
      </Row>
    </div>
  );
}

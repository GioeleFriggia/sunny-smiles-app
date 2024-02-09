import React from "react";
import { Row, Col } from "react-bootstrap";

const MyFooter = () => (
  <footer>
    <Row className="text-center mt-5">
      <Col xs={{ span: 6, offset: 3 }}>
        <Row>
          <Col xs={12} className="text-left mb-2">
            <i className="fa fa-facebook footer-icon"></i>
            <i className="fa fa-instagram footer-icon"></i>
            <i className="fa fa-twitter footer-icon"></i>
            <i className="fa fa-youtube footer-icon"></i>
          </Col>
          <span className="text-white m-auto p-2">
            <strong>Sunny Smiles</strong> - Copyright {new Date().getFullYear()}
          </span>
        </Row>
      </Col>
    </Row>
  </footer>
);

export default MyFooter;

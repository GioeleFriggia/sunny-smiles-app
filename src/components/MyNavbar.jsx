// SunnySmilesNavbar.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Aggiunto import per Link

const SunnySmilesNavbar = () => {
  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center ml-4">
        {" "}
        {/* Modificato il link a "/" */}
        <img
          src="https://www.arpa.piemonte.it/app/logo-app-meteo/image"
          height="80"
          width="90"
          style={{ borderRadius: "90%" }} // Modificato borderRadius in stile inline
          className="d-inline-block align-top mr-2"
          alt="Sunny Smiles Logo"
        />
        <span className="font-weight-bold">Sunny Smiles</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="font-weight-bold">
            {" "}
            {/* Modificato il link a "/" */}
            Home
          </Nav.Link>
          <Nav.Link href="#link" className="font-weight-bold">
            About
          </Nav.Link>
          <Nav.Link href="#link" className="font-weight-bold">
            Services
          </Nav.Link>
          <Nav.Link href="#link" className="font-weight-bold">
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SunnySmilesNavbar;

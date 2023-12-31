import React from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const logout = () => {
    window.location.href = "/login";
  };
  return (
    <Navbar expand="lg" className="navbar-dark bg-dark">
      <Container fluid>
        <a className="navbar-brand" href="#">
          Vishaka
        </a>
        <Navbar.Toggle
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Nav.Item>
              <Nav.Link
                to={"/dashboard"}
                as={NavLink}
                aria-current="page"
                href="#"
              >
                Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to={"/stock"}>
                Stock
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/client">
                Client
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to={"/invoice"}>
                Invoice
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to={"/payment"}>
                Payment
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to={"/report"}>
                Report
              </Nav.Link>
            </Nav.Item>
          </ul>
          <span className="navbar-text">Logout</span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

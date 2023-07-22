import React from "react";
import { Card, Container, Form, Row, Button } from "react-bootstrap";
import logo from "../assets/images/logo.jpg";
import { getFormJSON, setName, setToken } from "../utils/utils";
import authService from "../service/authService";
import { APIResponse } from "../types";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [errorText, setErrorText] = React.useState("");
  const navigate = useNavigate();
  const auth = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const body = getFormJSON(e.target);
    const response = await authService.login(body);
    if (!response.success) {
      setErrorText(response.message);
    } else {
      setName(response.data.name);
      setToken(response.data.token);
      navigate("/stock");
    }
  };

  return (
    <div className="login-main">
      <Container>
        <Row className="justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-5">
            <Card className="login-card">
              <Card.Header className="login-card-header">
                <img className="logo" src={logo} alt="logo" />
                <Card.Title className="login-card-title">Login</Card.Title>
                <Card.Text className="login-description">
                  Please enter your user information.
                </Card.Text>
              </Card.Header>
              <form onSubmit={auth}>
                <Card.Body className="login-card-body">
                  <Form.Group className="login-form-group">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      className="login-input"
                      type="text"
                      name="username"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="login-form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="login-input"
                      type="password"
                      name="password"
                      required
                    />
                  </Form.Group>
                  <span className="login-error">{errorText}</span>
                  <Button className="login-btn" variant="primary" type="submit">
                    Log in
                  </Button>
                </Card.Body>
              </form>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

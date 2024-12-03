import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style.css";
import logo from "../../Components/images/Logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Show loading state

    if (!isHuman) {
      alert("Please confirm that you are human.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8012/api/Login/StudentSignin", {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: userId, Password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login Successful:", data);   
        navigate("/StudentDashboard"); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please check your connection.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <Container
      fluid
      className="vh-100 bg-image d-flex justify-content-center align-items-center"
    >
      <Row>
        <Col xs={12} md={6} lg={4}>
          <div className="p-4 bg-white rounded shadow border login-card border-success">
            <div className="text-center mb-4">
              <img
                src={logo}
                alt="Math Gym Logo"
                className="img-fluid mb-3"
                style={{ width: "80px" }}
              />
              <h2 className="text-success">MATH GYM</h2>
              <p className="text-muted">FLEX YOUR BRAIN</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="userId">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 position-relative" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="position-absolute top-50 end-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </Form.Group>
              <div className="d-flex justify-content-end mb-3">
                <a href="#!" className="text-decoration-none">
                  Forgot Password?
                </a>
              </div>
              <Form.Group controlId="formHumanCheck">
                <Form.Check
                  type="checkbox"
                  label="I am a human"
                  checked={isHuman}
                  onChange={() => setIsHuman(!isHuman)} // Toggle checkbox state
                />
              </Form.Group>
              <Button
                type="submit"
                variant="success"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center mt-3">
                <small>
                  Don’t have an account?{" "}
                  <a href="#!" className="text-decoration-none">
                    Sign Up
                  </a>
                </small>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;

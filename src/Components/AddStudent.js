import React, { useState } from "react";
import { Offcanvas, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios"; // Ensure axios is installed: npm install axios

const AddStudentPanel = ({ show, onClose }) => {
  // State to store form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    grade: "",
    address: "",
    countryCode: "+91", // Default country code
  });

  // State to handle submission feedback
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the state for each field
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show a loading state (optional)

    try {
      const response = await axios.post("https://appsail-10091564320.development.catalystappsail.com/api/registerStudent", {
        ...formData,
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`, // Combine country code and phone number
        password: "admin@123", // Use a default password or let the user input
        role: "user", // Set the default role as 'student' or use dynamic data
      });

      console.log("Student added successfully:", response.data);

      // Clear the form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dob: "",
        grade: "",
        address: "",
      });

      onClose(); // Close the form
    } catch (error) {
      console.error("Failed to register student:", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add New Student</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formStudentFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formStudentLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formStudentEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Row>
                <Col xs={3}>
                  <Form.Select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (Australia)</option>
                    {/* Add more country codes as needed */}
                  </Form.Select>
                </Col>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Select
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Grade</option>
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
              {/* Add more grades as needed */}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Add Student"}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddStudentPanel;

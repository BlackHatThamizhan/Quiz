import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Sidebar from '../Admin/SidePannel';
import AdminHeader from '../Admin/AdminHeader'
import { Container, Row, Col, Button, Table, Form, InputGroup } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import EditTeacher from './EditTeacher';
import ViewTeacher from '../ViewTeacher';
import { useNavigate } from "react-router-dom";

const ListTeacher = ({ Teachers = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [showEditTeacher, setShowEditTeacher] = useState(false);
  const [showViewTeacher, setShowViewTeacher] = useState(false);
  const TeachersPerPage = 10;
  const navigate = useNavigate(); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset pagination on search
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleOpenEditTeacher = () => setShowEditTeacher(true);
  const handleCloseEditTeacher = () => setShowEditTeacher(false);
  const handleOpenViewTeacher = () => setShowViewTeacher(true);
  const handleCloseViewTeacher = () => setShowViewTeacher(false);

  const TeacherData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    countryCode: "+91",
    dob: "2000-01-01",
    grade: "Grade 3",
    address: "123 Street, City",
  };


  const filteredTeachers = Teachers.filter((Teacher) =>
    [Teacher.username, Teacher.email]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const currentTeachers = filteredTeachers.slice(
    currentPage * TeachersPerPage,
    (currentPage + 1) * TeachersPerPage
  );

  return (
    <div>
      <AdminHeader />
      <div className="d-flex">
        <Sidebar />
        <Container fluid className="p-4 maincontainerbg min-vh-100">
        <div className="sub-container">
          <Row className="align-items-center mb-4">
            <Col md={6}>
              <h2 className="fw-bold">Teacher List</h2>
            </Col>

          </Row>
          <Row className="align-items-center mb-4">
            <Col md={6}>
              <InputGroup>
                <Form.Control
                  placeholder="Search Teachers by name or email"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
            <Col md={6} className="d-flex justify-content-end gap-3">
              <Button variant="outline-secondary"  onClick={() => navigate('/addTeacher')}>
                Add Teacher
              </Button>
             
            </Col>
          </Row>
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Teacher Name</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTeachers.length > 0 ? (
                  currentTeachers.map((Teacher , index) => (                  
                    <tr key={Teacher.id}>
                      <td>{index+1}</td>
                      <td>{Teacher.username}</td>
                      <td>{Teacher.email}</td>
                      <td>{Teacher.dob || 'N/A'}</td>
                      <td>{Teacher.phone}</td>
                      <td>
                        <div className="d-flex">
                          <div className="icon-button-container">
                            <Button variant="outlined" size="sm" className="icon-button" onClick={handleOpenEditTeacher}>
                              <FaEdit className="icon" />
                            </Button>
                            <span className="tooltip-text">Edit</span>
                          </div>
                          <div className="icon-button-container">
                            <Button variant="outlined" size="sm" className="icon-button">
                              <FaTrash className="icon" />
                            </Button>
                            <span className="tooltip-text">Delete</span>
                          </div>
                          <div className="icon-button-container">
                            <Button variant="outlined" size="sm" className="icon-button" onClick={handleOpenViewTeacher}>
                              <FaEye className="icon" />
                            </Button>
                            <span className="tooltip-text">View</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Teachers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <ReactPaginate
              pageCount={Math.ceil(filteredTeachers.length / TeachersPerPage)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousLabel="&laquo;"
              nextLabel="&raquo;"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
            />
          </div>
          </div>
        </Container>
      
        <EditTeacher show={showEditTeacher} onClose={handleCloseEditTeacher} />
        <ViewTeacher  show={showViewTeacher} onClose={() => setShowViewTeacher(false)}   TeacherData={TeacherData} />
      </div>
    </div>
  );
};

export default ListTeacher;

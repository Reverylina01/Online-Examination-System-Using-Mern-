import React, { useEffect, useState } from "react";
import { Button, Card, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudentData = async () => {
    try {
      const studentData = await fetch("http://localhost:5001/api/users/");
      if (!studentData.ok) {
        throw new Error(`HTTP error! status: ${studentData.status}`);
      }
      const studentsResponse = await studentData.json();
      setStudents(studentsResponse);
      console.log(studentsResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditStudent = (studentId) => {
    console.log(studentId);
    // Navigate or handle edit here
  };

  const handleDelete = async (studentId) => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDeletion) return;
    try {
      const response = await fetch(`http://localhost:5001/api/users/${studentId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setStudents((prevStudent) => prevStudent.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Manage Students</h2>

      {students.length === 0 ? (
        <p style={{ color: "black" }}>No students found</p>
      ) : (
        <Card className="mb-4">
          <Card.Header>
            <h4>Students</h4>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>
                      <Button variant="info" size="sm" onClick={() => handleEditStudent(student._id)}>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(student._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* ✅ Small Back Button at the Bottom */}
      <div className="d-flex justify-content-start mt-3">
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </div>
    </div>
  );
};

export default ManageStudents;

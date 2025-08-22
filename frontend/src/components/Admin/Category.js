// Category.js
import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Category.css"; // Import the CSS file

function Category() {
  const [data, setData] = useState([]);
  const [id, setcId] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      handleClose();
      localStorage.setItem("id", "");
      localStorage.setItem("Name", "");
      const response = await axios("http://localhost:5001/api/categorys/list");
      setData(response.data.categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleClose();
        localStorage.setItem("id", "");
        localStorage.setItem("Name", "");
        const response = await axios("http://localhost:5001/api/categorys/list");
        setData(response.data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const setID = (_id, name) => {
    localStorage.setItem("id", _id);
    localStorage.setItem("Name", name);
  };

  const deleted = (id) => {
    setcId(id);
    handleShow();
  };

  const confirmdeleted = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/categorys/${id}`);
    } catch (err) {
      console.log("Error deleting:", err.response?.data?.message || err.message);
    }
    fetchData();
  };

  return (
    <div className="category-page">
      <div className="category-container">
        <h1 className="page-title">Manage Categories</h1>

        <Table className="custom-table" responsive bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>
                  <Link to={`/admin/category/edit-category`}>
                    <Button
                      onClick={() => setID(category._id, category.name)}
                      variant="info"
                      className="action-btn"
                    >
                      Update
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    onClick={() => deleted(category._id)}
                    variant="danger"
                    className="action-btn"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="button-group">
          <Link to="/admin/category/create-category">
            <Button className="create-btn">+ Create Category</Button>
          </Link>

          <Button onClick={() => navigate(-1)} className="back-btn">
            ← Back
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmdeleted}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Category;

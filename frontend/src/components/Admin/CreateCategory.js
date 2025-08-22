import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import axios from "axios";
import "./CreateCategory.css"; // ✅ Import custom styles

function CreateCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errortxt, setErrortxt] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/categorys/add", {
        name,
      });

      if (response.status === 201) {
        setName("");
        navigate("/admin/category/");
      } else {
        setErrortxt(response.data.message);
      }
      setIsLoading(false);
    } catch (err) {
      setErrortxt(err.response?.data?.message || "Something went wrong.");
      setIsLoading(false);
    }

    if (errortxt !== "") handleShow();
  };

  return (
    <div className="create-category-container">
      <h1 className="text-center mb-4">Create Category</h1>

      <Form className="form-wrapper" onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="form-label">Category Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            placeholder="Enter category name"
            required
            className="form-input"
          />
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" type="submit" className="submit-button">
            Submit
          </Button>
        </div>
      </Form>

      {/* ✅ Stylish Back Button at bottom */}
      <div className="back-button-wrapper">
        <Button
          variant="outline-secondary"
          size="sm"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>
      </div>

      {isLoading && <LoadingSpinner asOverlay />}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errortxt}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateCategory;

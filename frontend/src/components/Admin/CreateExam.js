// CreateExam.js
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateExam.css";

function CreateExam() {
  const navigate = useNavigate();
  const [examTitle, setExamTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctOption: 0,
  });

  // Fetch categories (subjects)
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/categorys/list");
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add a question to the list
  const addQuestion = () => {
    if (
      currentQuestion.text.trim() === "" ||
      currentQuestion.options.some((opt) => opt.trim() === "")
    ) {
      alert("Please fill in all question fields before adding.");
      return;
    }
    setQuestions([...questions, { ...currentQuestion }]);
    setCurrentQuestion({ text: "", options: ["", "", "", ""], correctOption: 0 });
  };

  // Handle option input changes
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  // Submit exam to backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!subject || subject === "Select Subject") {
      alert("Please select a subject.");
      return;
    }
    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    const newExam = {
      title: examTitle,
      subject: subject,
      questions: questions,
    };

    try {
      const response = await fetch("http://localhost:5001/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExam),
      });

      if (!response.ok) {
        throw new Error(`Failed to create exam: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Exam created:", data);

      // Reset form
      setExamTitle("");
      setSubject("");
      setQuestions([]);
      setCurrentQuestion({ text: "", options: ["", "", "", ""], correctOption: 0 });

      // Redirect to admin dashboard
     
 navigate("/admin/dashbord");
    } catch (err) {
      console.error("Error creating exam:", err.message);
      alert(`Failed to create exam: ${err.message}`);
    }
  
  };
  return (
    <div className="create-exam-container">
      <div className="form-box">
        <h1 className="title">Create Exam</h1>
        <Form onSubmit={handleSubmit}>
          {/* Exam Title */}
          <Form.Group className="mb-3" controlId="formExamTitle">
            <Form.Control
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              placeholder="Enter Exam Title"
              required
            />
          </Form.Group>

          {/* Subject Selection */}
          <Form.Group className="mb-3" controlId="formExamSubject">
            <Form.Select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option>Select Subject</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Question Section */}
          <h4 className="section-title">Add Question</h4>
          <Form.Group className="mb-3" controlId="formQuestionText">
            <Form.Control
              type="text"
              value={currentQuestion.text}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, text: e.target.value })
              }
              placeholder="Enter Question Text"
            />
          </Form.Group>

          {/* Options */}
          {currentQuestion.options.map((option, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Control
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            </Form.Group>
          ))}

          {/* Correct Option */}
          <Form.Group className="mb-4">
            <Form.Select
              value={currentQuestion.correctOption}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  correctOption: Number(e.target.value),
                })
              }
            >
              {currentQuestion.options.map((_, index) => (
                <option key={index} value={index}>
                  Correct Option {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Add Question Button */}
          <div className="d-grid mb-3">
            <Button variant="secondary" type="button" onClick={addQuestion}>
              + Add Question
            </Button>
          </div>

          {/* Preview Questions */}
          <h5 className="preview-title">Questions Preview</h5>
          <ul className="preview-list">
            {questions.map((q, i) => (
              <li key={i}>
                <strong>{i + 1}. </strong> {q.text}{" "}
                <span className="text-muted">
                  (Correct: Option {q.correctOption + 1})
                </span>
              </li>
            ))}
          </ul>

          {/* Submit Button */}
          <div className="d-grid mt-4">
            <Button variant="primary" type="submit">
              Submit Exam
            </Button>
          </div>

          {/* Back Button */}
          <div className="d-grid mt-4">
            <Button variant="outline-dark" onClick={() => navigate(-1)}>
              ← Back
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateExam;

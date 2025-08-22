

A modern, scalable online examination platform built using the MERN stack (MongoDB, Express.js, React, Node.js).

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Setup](#environment-setup)
  * [Running the Project](#running-the-project)
* [Testing](#testing)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## Overview

This system allows administrators to create and manage exams while students can take exams and view results. It offers user authentication, secure exam access, and real-time evaluation.

---

## Features

* Secure student and admin authentication
* Create, schedule, and manage exams
* Real-time participation and submission
* Auto-evaluation and analytics dashboard
* RESTful APIs with Express and Node.js
* Responsive frontend using React
* MongoDB database for data persistence

---

## Project Structure

```
Online-Examination-System-Using-Mern-/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.js
    │   └── index.js
    ├── .env
    ├── package.json
    └── README.md
```

---

## Getting Started

### Prerequisites

* Node.js >= 14
* npm or yarn
* MongoDB (local or cloud)

### Installation

```bash
git clone https://github.com/Reverylina01/Online-Examination-System-Using-Mern-.git
cd Online-Examination-System-Using-Mern-
```

### Environment Setup

Create `.env` files in `Backend` and `frontend`:

**Backend/.env:**

```
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

**frontend/.env:**

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Project

Open two terminals:

**Backend:**

```bash
cd Backend
npm install
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

---

## Testing

* Use Postman or Insomnia for API testing.
* Use React Testing Library or Cypress for frontend tests.

---

## Deployment

* **Backend:** Deploy using Heroku, AWS, or Render.
* **Frontend:** Deploy using Netlify, Vercel, or GitHub Pages.

Ensure production environment variables are configured properly.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Description"`
4. Push: `git push origin feature-name`
5. Open a Pull Request

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

* **Author:** Reverylina
* **GitHub:** [Reverylina01](https://github.com/Reverylina01)
* **Project URL:** [Online Examination System Using MERN](https://github.com/Reverylina01/Online-Examination-System-Using-Mern-)




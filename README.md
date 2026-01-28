# DeLearn-AI (Smart-DLMS) 🧠🎓

> **A Decentralized Learning Management System (LMS) powered by Microservices, Web3 (IPFS), and Generative AI.**

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Tech Stack](https://img.shields.io/badge/Stack-Spring_Boot_|_React_|_IPFS_|_AI-blue)

DeLearn-AI is a next-generation education platform designed to democratize learning. It combines the scalability of **Spring Boot Microservices**, the decentralized storage of **IPFS** for censorship-resistant content, and an **AI-powered Chatbot** to act as an intelligent 24/7 tutor for students.

## 🚀 Key Features

*   **🤖 AI-Powered Tutor**: Integrated chatbot to answer student queries instantly and provide personalized learning assistance.
*   **🌐 Decentralized Storage**: All course media (videos, PDFs) are stored on **IPFS** (InterPlanetary File System), ensuring distinct ownership and permanent availability.
*   **🔐 Role-Based Access Control (RBAC)**: Secure access for **Admins** (Instructors) and **Students** using JWT authentication.
*   **📦 Microservices Architecture**: Built with independent, scalable services:
    *   **Gateway Service**: Central entry point with routing and security.
    *   **Auth Service**: User identity and JWT management.
    *   **Course Service**: Course creation, management, and retrieval (MongoDB).
    *   **Enrollment Service**: Student course enrollments and progress tracking (MySQL).
    *   **Media Service**: IPFS integration for file uploads and streaming.
    *   **Eureka Server**: Service discovery and registration.
*   **💻 Modern Experience**: A responsive, material-design dashboard built with **React**.

## 🛠️ Technology Stack

*   **Frontend**: React.js, Material-UI (MUI), Axios
*   **Backend**: Java, Spring Boot 3, Spring Cloud Gateway, Eureka
*   **Databases**: MongoDB (Course Data), MySQL (Enrollment/User Data)
*   **Storage**: IPFS (via Kubo / Helia)
*   **AI Integration**: OpenAI / Custom LLM Integration (Planned)

## ⚙️ Getting Started

### Prerequisites
*   Java 17+
*   Node.js 18+
*   MongoDB (Running locally or via Docker)
*   MySQL (Running locally or via Docker)
*   IPFS Desktop / Daemon (For media features)

### Running Locally

1.  **Start the Infrastructure**:
    *   Ensure MongoDB is running on port `27017`.
    *   Ensure MySQL is running on port `3306`.
    *   Start IPFS Daemon.

2.  **Start Backend Services** (In recommended order):
    *   `EurekaServer`: Port `8761`
    *   `GateWay`: Port `8080`
    *   `AuthService`: Port `2000`
    *   `CourseService`: Port `8081`
    *   `EnrollmentService`: Port `8082`
    *   `MediaService`: Port `8085`

3.  **Start Frontend**:
    ```bash
    cd DLMSFrontend
    npm install
    npm start
    ```
4.  Access the application at `http://localhost:3000`.

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License
MIT

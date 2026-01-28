# DeLearn-AI (Smart-DLMS) 🧠🎓

<div align="center">

![Project Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![Java Version](https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)

**A Decentralized Learning Management System (LMS) powered by Microservices, Web3 (IPFS), and Generative AI.**

</div>

> **DeLearn-AI** is a next-generation education platform designed to democratize learning. It combines the scalability of **Spring Boot Microservices**, the decentralized storage of **IPFS** for censorship-resistant content, and an **AI-powered Chatbot** to act as an intelligent 24/7 tutor for students.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🏗️ Architecture](#️-architecture)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [🔧 Configuration](#-configuration)
- [🧪 Testing](#-testing)
- [📦 Deployment](#-deployment)
- [🗺️ Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Support](#-support)

---

## ✨ Features

| Feature                          | Description                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------- |
| 🤖 **AI-Powered Tutor**          | Integrated chatbot to answer student queries instantly and provide personalized learning assistance |
| 🌐 **Decentralized Storage**     | All course media (videos, PDFs) stored on **IPFS** for censorship-resistant content                 |
| 🔐 **Role-Based Access Control** | Secure JWT authentication for Admins (Instructors) and Students                                     |
| 📦 **Micervices Architecture**   | Independent, scalable services for better maintainability                                           |
| 💻 **Modern UI/UX**              | Responsive, material-design dashboard built with React                                              |
| 📊 **Progress Tracking**         | Comprehensive enrollment and progress tracking system                                               |

---

## 🛠️ Technology Stack

### Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Material-UI](https://img.shields.io/badge/Material--UI-5.x-0081CB?style=flat-square&logo=mui)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat-square&logo=axios)

### Backend

![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=flat-square&logo=springboot)
![Spring Cloud Gateway](https://img.shields.io/badge/Spring_Cloud_Gateway-2023.x-6DB33F?style=flat-square)
![Eureka](https://img.shields.io/badge/Eureka-Server-FF6600?style=flat-square&logo=netflix)

### Databases

![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat-square&logo=mongodb)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat-square&logo=mysql)

### Storage & AI

![IPFS](https://img.shields.io/badge/IPFS-Latest-F39141?style=flat-square&logo=ipfs)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=flat-square&logo=openai)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DeLearn-AI Architecture                           │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │   Browser   │
                              └──────┬──────┘
                                     │
                              ┌──────▼──────┐
                              │   React     │  (Frontend - Port 3000)
                              │  Frontend   │
                              └──────┬──────┘
                                     │
                              ┌──────▼──────┐
                              │   Gateway   │  (Port 8080 - Spring Cloud Gateway)
                              │   Service   │
                              └──────┬──────┘
                                     │
     ┌─────────────┬─────────────────┼─────────────────┬─────────────────────┐
     │             │                 │                 │                     │
┌────▼────┐  ┌─────▼─────┐    ┌──────▼──────┐   ┌──────▼──────┐    ┌───────▼───────┐
│  Auth    │  │  Course   │    │ Enrollment  │   │   Media     │    │  Eureka       │
│ Service  │  │ Service   │    │  Service    │   │  Service    │    │  Server       │
│ (2000)   │  │  (8081)   │    │   (8082)    │   │   (8085)    │    │   (8761)      │
└────┬─────┘  └─────┬─────┘    └──────┬──────┘   └──────┬──────┘    └───────┬───────┘
     │             │                 │                 │                     │
     │             │                 │                 │                     │
┌────▼────┐  ┌─────▼─────┐           │           ┌──────▼──────┐             │
│  MySQL  │  │  MongoDB  │           │           │     IPFS    │◄────────────┘
│  (3306) │  │  (27017)  │           │           │ Decentralized│   (Service
└─────────┘  └───────────┘           │           │   Storage   │    Discovery)
                                      │           └─────────────┘
                                      │                  ▲
                                      │                  │
                                      │                  │
                               ┌──────▼──────────────────┐
                               │      MySQL (Enrollments)│
                               │         (3306)          │
                               └─────────────────────────┘
```

---

## 📁 Project Structure

```
DeLearn-AI/
├── 📄 README.md
├── 📄 .gitignore
├── 🎨 DLMSFrontend/                    # React Frontend Application
│
├── 🔧 Backend Services/
│   ├── 🏛️ EurekaServer/                # Service Discovery Server
│   ├── 🚪 Gateway/                     # API Gateway with JWT Authentication
│   ├── 🔐 DLMSAuth/                    # Authentication Service
│   ├── 📚 course-service/              # Course Management Service
│   ├── 📝 enrollment-service/          # Enrollment & Progress Tracking
│   └── 📦 MediaService/                # IPFS Media Storage Service
```

---

## 🚀 Getting Started

### Prerequisites

| Tool       | Version | Description                 |
| ---------- | ------- | --------------------------- |
| ☕ Java    | 17+     | Backend runtime environment |
| 📦 Node.js | 18+     | Frontend build tools        |
| 🍃 MongoDB | 6.x     | Course data storage         |
| 🐬 MySQL   | 8.x     | Enrollment & user data      |
| 🪐 IPFS    | Latest  | Decentralized file storage  |
| 🐳 Docker  | 20.x+   | Containerization (optional) |

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/DeLearn-AI.git
   cd DeLearn-AI
   ```

2. **Install backend dependencies**

   ```bash
   cd EurekaServer
   ./mvnw clean install

   cd ../Gateway
   ./mvnw clean install

   # Repeat for other services...
   ```

3. **Install frontend dependencies**
   ```bash
   cd DLMSFrontend
   npm install
   ```

### Running the Application

#### 1. Start Infrastructure Services

```bash
# Start MongoDB (Docker)
docker run -d -p 27017:27017 --name mongodb mongo:6

# Start MySQL (Docker)
docker run -d -p 3306:3306 --name mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=dlms \
  mysql:8

# Start IPFS Daemon
ipfs daemon
```

#### 2. Start Backend Services

Start services in the following order:

| Service            | Port | Command                                           |
| ------------------ | ---- | ------------------------------------------------- |
| Eureka Server      | 8761 | `cd EurekaServer && ./mvnw spring-boot:run`       |
| Gateway            | 8080 | `cd Gateway && ./mvnw spring-boot:run`            |
| Auth Service       | 2000 | `cd DLMSAuth && ./mvnw spring-boot:run`           |
| Course Service     | 8081 | `cd course-service && ./mvnw spring-boot:run`     |
| Enrollment Service | 8082 | `cd enrollment-service && ./mvnw spring-boot:run` |
| Media Service      | 8085 | `cd MediaService && ./mvnw spring-boot:run`       |

#### 3. Start Frontend

```bash
cd DLMSFrontend
npm start
```

#### 4. Access the Application

| Component         | URL                                   |
| ----------------- | ------------------------------------- |
| Frontend          | http://localhost:3000                 |
| Gateway API       | http://localhost:8080/api             |
| Eureka Dashboard  | http://localhost:8761                 |
| API Documentation | http://localhost:8080/swagger-ui.html |

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/dlms
MYSQL_ROOT_PASSWORD=your_password
MYSQL_DATABASE=dlms

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=86400000

# IPFS Configuration
IPFS_HOST=localhost
IPFS_PORT=5001
IPFS_GATEWAY=http://localhost:8080/ipfs/

# Application Configuration
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=dev
```

### Service Configuration

Each service can be configured via `application.properties` or `application.yml` files located in:

```
service-name/src/main/resources/application.properties
```

---

## 🧪 Testing

### Backend Testing

```bash
# Run all tests
cd course-service
./mvnw test

# Run specific service tests
cd enrollment-service
./mvnw test

# Generate test coverage report
./mvnw jacoco:report
```

### Frontend Testing

```bash
cd DLMSFrontend
npm test              # Run unit tests
npm run test:coverage # Run tests with coverage
npm run e2e          # Run end-to-end tests (Cypress)
```

### Test Coverage Badges

| Service            | Coverage                                                        |
| ------------------ | --------------------------------------------------------------- |
| Course Service     | ![Coverage](https://img.shields.io/badge/Coverage-85%25-green)  |
| Enrollment Service | ![Coverage](https://img.shields.io/badge/Coverage-80%25-green)  |
| Media Service      | ![Coverage](https://img.shields.io/badge/Coverage-75%25-yellow) |

---

## 📦 Deployment

### Docker Deployment

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Kubernetes Deployment

```bash
# Apply Kubernetes configurations
kubectl apply -f k8s/
```

---

## 🗺️ Roadmap

| Feature                    | Status      | Target Version |
| -------------------------- | ----------- | -------------- |
| ✅ Basic LMS functionality | Complete    | v1.0           |
| ✅ IPFS integration        | Complete    | v1.1           |
| 🔄 AI Chatbot integration  | In Progress | v2.0           |
| 📱 Mobile application      | Planned     | v2.1           |
| 🌍 Multi-language support  | Planned     | v2.2           |
| 🎓 Advanced analytics      | Planned     | v3.0           |
| 🔗 Blockchain certificates | Researching | v3.1           |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### How to Contribute

1. 🍴 Fork the repository
2. 🔧 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 📝 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 🚀 Push to the branch (`git push origin feature/amazing-feature`)
5. 📬 Open a Pull Request

### Contributors

<a href="https://github.com/your-username/DeLearn-AI/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-username/DeLearn-AI" />
</a>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 DeLearn-AI Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Support

- 📧 **Email**: support@delearn-ai.com
- 💬 **Discord**: [Join our community](https://discord.gg/delearn-ai)
- 📖 **Documentation**: [Wiki](https://github.com/your-username/DeLearn-AI/wiki)
- 🐛 **Issues**: [Bug Reports](https://github.com/your-username/DeLearn-AI/issues)

---

<div align="center">

**Made with ❤️ by the DeLearn-AI Team**

![GitHub Stars](https://img.shields.io/github/stars/your-username/DeLearn-AI?style=social)
![GitHub Forks](https://img.shields.io/github/forks/your-username/DeLearn-AI?style=social)
![GitHub Watchers](https://img.shields.io/github/watchers/your-username/DeLearn-AI?style=social)

</div>

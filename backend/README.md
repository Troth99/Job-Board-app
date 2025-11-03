# 🎯 Job Board Backend

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

## 🎯 Overview

A powerful and scalable backend API for a modern job board application, built with **Node.js** and **MongoDB**. This system provides a robust foundation for managing job listings with full CRUD operations, secure user authentication, and cloud deployment capabilities.

---

## 🚀 Key Features

<table>
  <tr>
    <td>✨ <b>Job Management</b></td>
    <td>Full CRUD operations for job listings with advanced filtering</td>
  </tr>
  <tr>
    <td>🔐 <b>Security</b></td>
    <td>JWT-based authentication with secure password hashing</td>
  </tr>
  <tr>
    <td>🌐 <b>Cloud Ready</b></td>
    <td>Deployed and accessible via Render.com</td>
  </tr>
  <tr>
    <td>📦 <b>MongoDB Atlas</b></td>
    <td>Cloud-hosted database with reliable data persistence</td>
  </tr>
  <tr>
    <td>🔄 <b>CORS Support</b></td>
    <td>Configured for secure cross-origin requests</td>
  </tr>
</table>

---

## 🛠️ Technology Stack

- **Runtime**: `Node.js` - Server-side JavaScript execution
- **Framework**: `Express.js` - Web application framework
- **Database**: `MongoDB Atlas` - Cloud database service
- **ODM**: `Mongoose` - MongoDB object modeling
- **Security**: 
  - `JWT` - JSON Web Token authentication
  - `bcrypt` - Password hashing
  - `helmet` - HTTP headers security
- **Utilities**:
  - `dotenv` - Environment configuration
  - `cors` - Cross-Origin Resource Sharing

---

## 💻 Installation Guide

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://your_mongo_uri_here
JWT_SECRET=your_secure_secret_key
NODE_ENV=development
```

### 2. Configuration Details

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT | `your_secure_key` |
| `NODE_ENV` | Environment mode | `development`/`production` |

## 🌐 API Deployment

**Live API URL**: [https://job-board-backend-7gfd.onrender.com](https://job-board-backend-7gfd.onrender.com)

The API is deployed on Render.com, providing:
- Automatic deployments
- SSL/TLS security
- High availability
- Real-time logs

## 📜 License:

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📚 Resources & Documentation

<table>
  <tr>
    <td>📘 <b>MongoDB Atlas</b></td>
    <td>Cloud database service (<a href="https://www.mongodb.com/cloud/atlas">Documentation</a>)</td>
  </tr>
  <tr>
    <td>📗 <b>Express.js</b></td>
    <td>Web framework (<a href="https://expressjs.com/">Documentation</a>)</td>
  </tr>
  <tr>
    <td>📕 <b>Mongoose</b></td>
    <td>MongoDB ODM (<a href="https://mongoosejs.com/">Documentation</a>)</td>
  </tr>
  <tr>
    <td>📙 <b>JWT</b></td>
    <td>Authentication (<a href="https://jwt.io/">Documentation</a>)</td>
  </tr>
</table>

---
<div align="center">
Made with ❤️ by Troth99
</div>
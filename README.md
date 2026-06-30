# 🎮 GamersHub Backend

REST API powering GamersHub.

> ⚠️ This repository contains only the backend server.

Frontend Repository

https://github.com/nikhilvishwakarma077/gamershub-backend

---

# 🚀 Live Demo

🔗 https://gamershub-ffm.vercel.app/

---

# ✨ Features

* JWT Authentication
* HTTP-only Cookie Based Sessions
* User Registration & Login
* Profile Management
* Player Request Management
* Protected Routes
* MongoDB Integration
* Role-based Authorization
* RESTful API Architecture

---

# 🛠 Tech Stack

Frontend

- React
- Typescript
- Vite
- TailwindCSS
- React Router
- Axios
- Cloudinary
- React Hot Toast

Backend

- Node.js
- Express
- MongoDB
- Typescript
- JWT
- Cloudinary

Deployment

- Vercel
- Render

---


# 🏗 Architecture

```
Frontend

    ↓

Express

    ↓

Controllers

    ↓

Services

    ↓

MongoDB

    ↓

Cloudinary
```

---

# Installation

```bash
git clone <backend-repository-url>
cd gamershub-backend

npm install
```

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

NODE_ENV=development
```

# Run Development Server

```bash
npm run dev
```

# Build Project

```bash
npm run build
```

# Run Production Build

```bash
npm start
```

---

# API Modules

### Authentication

* Register User
* Login User
* Logout User
* Get Current User

### Profile

* Create Profile
* Update Profile
* Get Profile
* Get All Profiles

### Player Requests

* Create Player Request
* Update Player Request
* Delete Player Request
* Get All Requests
* Get My Requests

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Nikhil Vishwakarma

[Portfolio](https://portfolio-nikhil077.vercel.app/)

[GitHub](https://github.com/nikhilvishwakarma077)

[LinkedIn](https://www.linkedin.com/in/nikhil-vishwakarma-874776376)
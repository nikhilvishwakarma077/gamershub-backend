# GamersHub Backend

REST API for the GamersHub esports networking platform.

## Features

* JWT Authentication
* HTTP-only Cookie Based Sessions
* User Registration & Login
* Profile Management
* Player Request Management
* Protected Routes
* MongoDB Integration
* Role-based Authorization
* RESTful API Architecture

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Cookie Parser

## Installation

```bash
git clone <backend-repository-url>
cd gamershub-backend

npm install
```

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

NODE_ENV=development
```

## Run Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Run Production Build

```bash
npm start
```

## API Modules

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

## Deployment

### Backend

* Render

### Database

* MongoDB Atlas

## Author

Nikhil Vishwakarma

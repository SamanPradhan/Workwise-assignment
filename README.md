
## Tech Stack

- **Backend:**
  - Node.js
  - Express.js
  - PostgreSQL
  - Sequelize (ORM)
  - bcrypt (for password hashing)
  - JSON Web Token (JWT) for authentication

- **Frontend:**
  - React.js (via Vite)
  - React Router DOM (for routing)
  - Axios (for API calls)

## Features

- **User Authentication:** Signup and Login using JWT.
- **Seat Reservation:** Reserve up to 7 seats per booking. The algorithm attempts to select contiguous seats in a row first, then the nearest possible block if contiguous seats aren’t available.
- **Seat Availability:** Display booked and available seat counts along with a responsive seat grid.
- **Responsive UI:** Both desktop and mobile views are supported.
- **Reset Booking:** (Optional) Admin-level endpoint for resetting seat bookings.

## Setup Instructions

### Backend

1. **Install Dependencies:**
   - Navigate to the `backend` folder.
   - Run `npm install` to install all required packages.

2. **Configure Environment Variables:**
   - Create a `.env` file in the `backend` folder.
   - Add the following variables (adjust values as needed):

     ```env
     DB_USER=your_postgres_username
     DB_PASSWORD=your_postgres_password
     DB_NAME=train_reservation_db
     DB_HOST=127.0.0.1
     JWT_SECRET=your_jwt_secret
     PORT=3000
     ```

3. **Database Setup:**
   - Ensure you have PostgreSQL installed and running.
   - Create a database matching the `DB_NAME` in your `.env` file.
   - Run the migrations (if using Sequelize CLI) or let the code run `sequelize.sync({ alter: true })` to create/update the tables.

4. **Start the Backend Server:**
   - Run `npm run dev` (or `npm start` for production) from within the `backend` folder.
   - The backend will run on `http://localhost:3000` (or the port specified in your `.env`).

### Frontend

1. **Install Dependencies:**
   - Navigate to the `frontend` folder.
   - Run `npm install` to install all required packages.

2. **Configure Environment Variables:**
   - Create a `.env` file in the `frontend` folder.
   - Add the following variable (adjust the URL if your backend is deployed elsewhere):

     ```env
     VITE_BASE_URL=http://localhost:3000
     ```

3. **Start the Frontend App:**
   - Run `npm run dev` to start the development server.
   - Open your browser and go to the URL provided by Vite (usually `http://localhost:5173`).

## API Documentation

### 1. **User Signup**

- **Endpoint:** `/api/auth/signup`  
- **Method:** `POST`  
- **Headers:** `Content-Type: application/json`  
- **Sample Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
- **Sample Response:**
  ```json
    {
        "message": "User created successfully.",
        "success": true
    }

### 2. **User Login**

- **Endpoint:** `/api/auth/login`  
- **Method:** `POST`  
- **Headers:** `Content-Type: application/json, Authorization: Bearer <your_jwt_token_here>`  
- **Sample Request Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
- **Sample Response:**
  ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzYW1hbnByYWRoYW5AZ21haWwuY29tIiwiaWF0IjoxNzQzMDA5MzEzLCJleHAiOjE3NDMwMTI5MTN9.KzlD9LL0-gEaV14BUb35E2n0p_ZmMa90xxrPIphWUI0",
        "success": true
    }

### 3. **Researve ticket**

- **Endpoint:** `/api/reservation/reserve`  
- **Method:** `POST`  
- **Headers:** `Content-Type: application/json, Authorization: Bearer <your_jwt_token_here>`  
- **Sample Request Body:**

  ```json
    {
    "numSeats": 2
    }
    
- **Sample Response:**
  ```json
    {
        "message": "Reservation successful",
        "reservationId": 1,
        "seats": [
            {
                "row": 1,
                "seatNumber": 1
            },
            {
                "row": 1,
                "seatNumber": 2
            }
        ],
        "success": true
    }


### 3. **Get seat informataions**

- **Endpoint:** `/api/seats`  
- **Method:** `GET`  

- **Sample Response:**
    List of JSON data of seats
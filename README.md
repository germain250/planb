Parking System Management System (PSSMS)
The Parking System Management System (PSSMS) is a full-stack web application built to manage parking operations, including parking slots, cars, parking records, payments, and reports. The frontend is developed using React with Tailwind CSS for a responsive, modern UI, featuring a dashboard with search, sort, and filter capabilities. The backend is built with Node.js, Express, and MongoDB, providing a robust API for data management. The application supports user authentication (login and registration) with session-based security.
Features

Dashboard: Displays total slots, occupied slots, total revenue, and an interactive table for parking records with search, sort, and filter functionality.
Parking Slots: Create and view parking slots with availability status.
Cars: Register and list cars with plate numbers, driver names, and phone numbers.
Parking Records: Create, update (mark exit), and delete parking records, with automatic fee calculation.
Payments: Record payments for parking records.
Reports: Generate detailed parking reports with search, sort, and filter options.
Authentication: User login and registration with session-based authentication.
Responsive Design: Tailwind CSS ensures a consistent, mobile-friendly UI with a pink brand color (#EC4899).

Tech Stack

Frontend:
React 18.2.0
React Router 6.22.3
Tailwind CSS 3.4.3
Axios 1.6.8


Backend:
Node.js
Express 4.19.2
MongoDB (with Mongoose 7.6.8)
Express Session 1.18.0


Database: MongoDB
Build Tool: Create React App (react-scripts 5.0.1)

Prerequisites
Ensure you have the following installed on your system:

Node.js (v16 or higher): Download
MongoDB: Install locally or use MongoDB Atlas. Local Installation
Git: To clone the repository (optional).
A modern web browser (Chrome, Firefox, etc.).

Project Structure
parking-system/
├── backend-project/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend-project/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── tailwind.css
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env
└── README.md

Installation and Setup
Follow these steps to set up and run the project locally.
1. Clone the Repository (Optional)
If you have the project files in a repository, clone it:
git clone https://github.com/germain250/planb
cd parking-system

Alternatively, ensure you have the backend and frontend directories with the files provided.
2. Backend Setup

Navigate to the backend directory:
cd backend


Install dependencies:
npm install


Set up environment variables:Create a .env file in the backend-project directory with the following content:
MONGO_URI=mongodb://localhost:27017/pssms
SESSION_SECRET=your-secret-key
PORT=5000


Replace MONGO_URI with your MongoDB connection string (local or MongoDB Atlas).
Replace your-secret-key with a secure random string for session encryption.


Start MongoDB:Ensure MongoDB is running locally:
mongod

Or configure MONGO_URI to point to a MongoDB Atlas cluster.

Start the backend server:
npx nodemon server

The backend should be running at http://localhost:5000. Verify by visiting http://localhost:5000/api/auth/check in your browser (should return { "isAuthenticated": false }).


3. Frontend Setup

Navigate to the frontend directory:
cd ../frontend


Install dependencies:
npm install


Set up environment variables:Create a .env file in the frontend-project directory with:
REACT_APP_API_URL=http://localhost:5000/api

This points the frontend to the backend API.

Start the frontend development server:
npm start

The frontend should open automatically in your default browser at http://localhost:5173.


4. Verify the Application

Access the app:Open http://localhost:5173 in your browser. You should see the login page.

Register a user:

Navigate to /register.
Enter a username and password, then submit.
On successful registration, you’ll be redirected to the dashboard.


Log in:

Navigate to /login.
Use the registered username and password to log in.
You should be redirected to the dashboard (/).


Test features:

Dashboard: View stats and interact with the parking records table (search, sort, filter).
Parking Slots: Create new slots and view their status.
Cars: Register cars with plate numbers, driver names, and phone numbers.
Parking Records: Create records, mark exits, and delete records.
Payments: Record payments for active parking records.
Reports: View detailed parking reports with filtering options.



Troubleshooting

MongoDB Connection Error:
Ensure MongoDB is running (mongod command).
Verify MONGO_URI in backend-project/.env is correct.


Backend Not Responding:
Check if port 5000 is free (lsof -i :5000 on Unix-based systems).
Restart the backend: npm start.


Frontend API Errors:
Confirm REACT_APP_API_URL in frontend-project/.env matches the backend URL.
Ensure the backend is running before starting the frontend.


CORS Issues:
The backend uses cors middleware to allow requests from http://localhost:5173. If issues persist, verify CORS settings in server.js.


Session Issues:
Ensure SESSION_SECRET is set in backend-project/.env.
Clear browser cookies if authentication fails.


Contributing
Feel free to fork the repository, make changes, and submit pull requests. Report issues via the repository’s issue tracker.
License
This project is licensed under the MIT License.

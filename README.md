# Work-It

A web application for tracking and managing your workouts.

## Getting Started

### Navigate to the project directory:

```bash
cd Work-It
```

### Install dependencies:

```bash
npm install
```

### Create a .env file:

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
PORT=http:4000
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Start the development server:

```bash
npm run start
```

### Run the backend server:

Ensure the backend is properly set up to handle API requests.

## Backend Setup

The backend is built using Node.js and Express. Refer to the `server` directory for the backend code. Make sure to:

- Set up the database connection in the backend.
- Use appropriate routes for handling workout creation, user authentication, and fetching user-specific workouts.

## Usage

### Signup/Login:
- Create a new account or log in to an existing one.

### Add a Workout:
- Fill out the form with workout details and save it to your account.

### Sort Workouts:
- Use the sorting feature to organize workouts based on your preferences.

### Track Progress:
- View your workout history and make adjustments as needed.

## Tech Stack

### Frontend:
- React.js
- CSS for styling

### Backend:
- Node.js
- Express.js

### Database:
- MongoDB

## Future Enhancements

- Add progress tracking with graphs and analytics.
- Add email notifications for missed workouts or reminders.

## Acknowledgments

This project was an opportunity to learn about the MERN stack. It started with a tutorial (Link in credits) that taught the basics of React, Node.js, Express.js, and MongoDB. After completing the tutorial, I expanded upon the initial implementation by adding features such as user authentication (JWT Tokens), workout sorting, and secure data handling as I applied my own knowledge and what I learned while upskilling.

## Credits
[Mern Stack Tutorial](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=1)

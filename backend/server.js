const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const cors = require('cors');
require('dotenv').config();

// express app
const app = express();

// parse json data from post requests
app.use(express.json());

// CORS
app.use(cors({ origin: 'http://localhost:3000' }));

// middleware
app.use((req, res, next) => {
    console.log(req.path, res.method);
    next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        // find users own workouts (sorted by latest date created)
        const workouts = await Workout.find({user: req.user._id}).sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (error) {
        return res.status(500).json({error: 'Server error '});
    }
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // fetch (logged in) users id
    const workout = await Workout.findById({ _id: id, user: req.user._id });

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// post(create) a workout
const createWorkout = async (req, res) => {

    const { title, load, reps } = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields});
    }

    // add doc to db
    try {
        const workout = await Workout.create({ title, load, reps, user: req.user._id}) 
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        // Find the workout by ID and check if the user matches
        const workout = await Workout.findOneAndDelete({ _id: id, user: req.user._id });

        if (!workout) {
            return res.status(400).json({ error: 'No such workout' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({ _id: id, user: req.user._id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}
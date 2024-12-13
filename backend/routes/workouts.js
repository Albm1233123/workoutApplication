const express = require('express');
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout

} = require('../controllers/workoutController')

const {protect} = require ('../middleware/authMiddleWare');

const router = express.Router();

// Get all workouts;
router.get('/', protect, getWorkouts);

// Get a single workout;
router.get('/:id', protect, getWorkout);

// Post a workout
router.post('/', protect, createWorkout);

// Delete a workout
router.delete('/:id', protect, deleteWorkout);

router.patch('/:id', protect, updateWorkout);

module.exports = router;
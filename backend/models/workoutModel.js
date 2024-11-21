const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define workout structure
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },

    // Reference user (so they can see they're own workouts)
    user: {
        type: moongoose.Schema.Types.ObjectID,
        ref: 'User',
        require: true
    }
}, { timestamps: true });

// Export model
module.exports = mongoose.model('Workout', workoutSchema);


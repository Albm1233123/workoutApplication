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
        require: true
    },
    load: {
        type: Number,
        require: true
    }
}, { timestamps: true });

// Export model
module.exports = mongoose.model('Workout', workoutSchema);


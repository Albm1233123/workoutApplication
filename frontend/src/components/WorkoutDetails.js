const WorkoutDetails = ({ workout, onDelete}) => {

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the workout');
            }

            onDelete(workout._id);
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };
    
    return (
        <div className='workout-details'>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg) </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails;
import { useState } from 'react';

const WorkoutForm = ({ onAddWorkout }) => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Please log in first');
            return;  // Don't send the request if no token is found
        }
        
        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        const json = await response.json();

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([])
            console.log('New Workout Added', json)
            onAddWorkout(json);
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label> Exercise Title:</label>
            <input 
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label> Load (in kg): </label>
            <input 
              type="number"
              onChange={(e) => setLoad(e.target.value)}
              value={load}
              className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label> Reps: </label>
            <input 
              type="number"
              onChange={(e) => setReps(e.target.value)}
              value={reps}
              className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button className="button">Add Workout</button>
            {error && <div className="Error">{error}</div>}
        </form>
    )
}

export default WorkoutForm
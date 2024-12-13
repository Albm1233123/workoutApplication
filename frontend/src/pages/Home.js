import { useEffect, useState } from 'react';

// Components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:4000/api/workouts', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setError('Session expired, please log in again');
                        localStorage.removeItem('token');  // Log out the user by removing the token
                    } else {
                        const errorText = await response.text();  // Get the response as text (if not JSON)
                        setError(errorText);  // Set the error message
                    }
                    return;
                }
                
                const json = await response.json();
                setWorkouts(json);  // Set the workouts data if the response is JSON
            } catch (err) {
                setError('Error fetching workouts');
                console.error('Fetch error:', err); 
            }
        };

        fetchWorkouts();
    }, []);


    const handleAddWorkout = (newWorkout) => {
        setWorkouts(prevWorkouts => [newWorkout, ...prevWorkouts]);  // Add the new workout to the beginning of the list
    };

    const handleDelete = (id) => {
        setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout._id !== id));
    };
    
    return (
        <div className="home">
            <div className="workouts">
                {error && <p>{error}</p>} 
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} onDelete={handleDelete}/>
                ))}
            </div>
            <WorkoutForm onAddWorkout={handleAddWorkout}/>
        </div>
    );
};

export default Home;

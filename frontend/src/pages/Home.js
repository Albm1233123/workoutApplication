import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

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
                        setError('Please log or register first.');
                        setTimeout(() => {
                            navigate('/')
                        }, 1000);
                        localStorage.removeItem('token');  // Log out the user by removing the token
                    } else {
                        const errorText = await response.text();  // Get the response as text (if not JSON)
                        setError(errorText);  // Set the error message
                    }
                    return;
                }
                
                const json = await response.json();
                setWorkouts(json);  // Set the workouts data if the response is JSON

                // Extract all unique categories from the fetched workouts
                const uniqueCategories = [...new Set(json.map(workout => workout.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                setError('Error fetching workouts');
                console.error('Fetch error:', err); 
            }
        };

        fetchWorkouts();
    }, []);

    // Update categories dynamically after adding or deleting a workout
    const updateCategories = (workoutsList) => {
        const uniqueCategories = [...new Set(workoutsList.map(workout => workout.category))];
        setCategories(uniqueCategories);
    };

    // Filter workouts based on selected category
    const filteredWorkouts = selectedCategory
        ? workouts.filter(workout => workout.category === selectedCategory)
        : workouts;

    const handleAddWorkout = (newWorkout) => {
        setWorkouts(prevWorkouts => {
            const updatedWorkouts = [newWorkout, ...prevWorkouts];  // Add the new workout
            updateCategories(updatedWorkouts);  // Update categories dynamically
            return updatedWorkouts;
        });
    };

    const handleDelete = (id) => {
        setWorkouts(prevWorkouts => {
            const updatedWorkouts = prevWorkouts.filter(workout => workout._id !== id);
            updateCategories(updatedWorkouts);  // Update categories dynamically
            return updatedWorkouts;
        });
    };
    
    return (
        <div className="home">
            <div className="filter">
                {/* Dropdown for selecting category */}
                <label htmlFor="category">Filter by Category:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <div className="workouts">
                    {error && <p>{error}</p>}
                    {filteredWorkouts && filteredWorkouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} onDelete={handleDelete} />
                    ))}
                </div>
            </div>

            <WorkoutForm onAddWorkout={handleAddWorkout} />
        </div>
    );
};

export default Home;

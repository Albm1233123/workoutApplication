import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        setError('User not authenticated. Please log in.');
        const timer = setTimeout(() => {
          navigate('/');
        }, 1000);
        return () => clearTimeout(timer);
      }

      try {
        const response = await fetch('http://localhost:4000/api/user/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading profile...</div>;
  }

  const handleBack = () => {
    navigate('/workouts');
  }

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <br/>
      <button className='button' onClick={handleBack}>Back</button>
    </div>
  );
};

export default Profile;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setToken(null); // Update the state
        navigate('/'); // Redirect to the login page
    };

    return (
        <button className="button" onClick={handleLogout} >Logout</button>
    );
};

export default LogoutButton;

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LogoutButton from './Logout';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    // This effect runs on initial render to set token from localStorage
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const handleProfileClick = () => {
        navigate('/profile');
      };

    return (
        <header>
            <div className="container">
                <Link to='/workouts'>
                    <h1>Work It</h1>
                </Link>
                {token && <LogoutButton setToken={setToken} />}  {/* Pass setToken to LogoutButton */}
                <button className='profile-btn' onClick={handleProfileClick}>Profile</button>
            </div>
        </header>
    );
};

export default Navbar;
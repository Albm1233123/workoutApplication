import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LogoutButton from './Logout';

const Navbar = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    // This effect runs on initial render to set token from localStorage
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    return (
        <header>
            <div className="container">
                <Link to='/workouts'>
                    <h1>Work It</h1>
                </Link>
                {token && <LogoutButton setToken={setToken} />}  {/* Pass setToken to LogoutButton */}
            </div>
        </header>
    );
};

export default Navbar;
import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Default to Login form

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and register
  };

  return (
    <div>
      {isLogin ? <Login /> : <Register />}
      <button onClick={toggleForm}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default AuthPage;

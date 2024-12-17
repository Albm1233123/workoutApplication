import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Default to Login form

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and register
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        {isLogin ? <Login /> : <Register />}
          <button onClick={toggleForm}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
      </div>
      <div className="separator"></div>
      <div className="social-login">
        <p>Login with social media:</p>
        <FacebookLoginButton onClick={() => console.log('Facebook login clicked')} />
        
        <pr>or</pr>
        <br></br>

        <GoogleLoginButton onClick={() => console.log('Google login clicked')} />
      </div>
    </div>
  );
};

export default AuthPage;

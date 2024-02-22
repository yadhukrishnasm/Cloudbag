import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate consistently

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(response => response.json())
      .then(userData => {
        console.log(userData);

        if (userData.success) {
          console.log(userData)
           navigate(`/main_homepage/${username}`);
        } else {
          console.error('Login failed:', userData.message);
        }
      })
      .catch(error => { 
        // Handle network or other errors
        console.error('Error during login:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?
        <Link to="/register"> Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;

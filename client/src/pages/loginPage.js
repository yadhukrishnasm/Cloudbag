import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/loginpage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    }) 
    .then(response => response.json())
    .then(userData => {
      console.log(userData);  

      if (userData.status === 1) {
        navigate(`/main_homepage/${username}`);
        sessionStorage.setItem("userid",userData.userid);
      } else {
        console.error('Login failed:', userData.message);
      }
    })
    .catch(error => { 
      console.error('Error during login:', error);
    });
  };

  return (
    <div>
      <div className="logincontainer">
        <div className="loginForm">
          <p className='Cloudbag-head'>Cloudbag</p>
          <pre id='loginpage-login'>Login.</pre>
          <form onSubmit={handleSubmit}>
            <p>
              
              <input type="text" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
            </p>
            <p>

              <input type="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
            </p>
            <button type="submit" className='loginButton'>Login</button><br />
          </form>
          <p id='toRegister'>
      
            Don't have an account?
            <Link to="/register" id='register'> Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;





  
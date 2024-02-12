import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    
    const handleSubmit = (e) => {
          e.preventDefault();
          
          fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username : username,
                password: password,
                email: email
            })
          })
            .then(response => response.json())
            .then(userData => {
              console.log(userData)
              userData === 0 ?console.log("Not registered"): console.log("registered successfully ")
            })
            .catch(error => {
              console.log(error);
          });
      
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="emial">Email:</label>
        <input type="text" id="email" value={password} onChange={(e) => setemail(e.target.value)} />
        <button type="submit">Register</button>
        </form>

        <p>
            already registered? <Link to="/">Login</Link>
        </p>

    </div>

  )
}

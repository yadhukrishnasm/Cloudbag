import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const navigate = useNavigate();
    
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
            .then(userData => {
              console.log(userData)
              if(userData === 0 ){
                console.log("Not registered")
              }
              else{
                console.log("registered successfully ")
                navigate('/')
              }
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
        <input type="text" id="email" value={email} onChange={(e) => setemail(e.target.value)} />
        <button type="submit">Register</button>
        </form>

        <p>
            already registered? <Link to="/">Login</Link>
        </p>

    </div>

  )
}

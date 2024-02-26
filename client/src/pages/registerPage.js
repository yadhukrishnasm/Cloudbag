import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import './styles/registerPage.css'

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
      {/* <Navbar /> */}
      <div className="registercontainer">
        <div className="registerForm">
          <p className='Cloudbag-registerhead'>Cloudbag</p>
          <h3>Register here!!</h3>
          <form onSubmit={handleSubmit}>
            <p>
              
              <input type="text" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
            </p>
            <p>

              <input type="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
            </p>
            <p>

              <input type="text" id="email" value={email} placeholder='email' onChange={(e) => setemail(e.target.value)}/> <br />
            </p>
            <button type="submit"className='registerButton'>Register</button><br />
          </form>
          <p id='toLogin'>
      
            Already registered?
            <Link to="/"id='toLogin'> Login</Link>
          </p>
        </div>
      </div>
    </div>

  )
}

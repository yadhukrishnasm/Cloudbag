import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './avatar.css'
import {PromptBox}  from './prompt-box'


const Avatar=({ username }) => {
  const Navigate = useNavigate()
  const [dropdown,setdropdown] = useState(false);
  const [prompt,setprompt] = useState(false)

  const handleDataReturn = (data)=>{
  if(data === true){
    sessionStorage.clear();
    Navigate('/')
  }
  else if(data === false){
    setprompt(false)}
  }

  const show =()=>{
      setdropdown(!dropdown)
    }

  const logout =()=>{
    setprompt(!prompt)
  }



  return (
    <div >
      <span id='username'>{username}</span>
      <button className="avatar" onClick={show}>
      </button>

      {dropdown && (
        <div className="dropdown">
            {prompt && ( 
              <PromptBox onDataReturn={handleDataReturn} type='logout' />
            )}
            <p id="sign-out" onClick={logout}>
              sign-out
            </p>
            {/* <p class="dropdown-button" id="delete" onClick={deleteAcc}> */}
              Delete account
            {/* </p> */}
          </div>
    )
    }
    </div>
  )
}

export default Avatar
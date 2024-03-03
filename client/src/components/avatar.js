import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './avatar.css'
import {PromptBox}  from './prompt-box'


const Avatar=({ username }) => {
  const Navigate = useNavigate()
  const [dropdown,setdropdown] = useState(false);
  const [prompt,setprompt] = useState(false)
  const [returnData,setReturnData] = useState()

  const handleDataReturn = (data)=>{
  setReturnData(data)
  }

  const show =()=>{
      setdropdown(!dropdown)
    }

  const logout = () =>{
    setprompt(true)
    console.log('entered logout function');
    if(returnData){
      sessionStorage.clear();
      Navigate('/')
    }
    else setprompt(false)
  }

  return (
    <div >
      <span id='username'>{username}</span>
      <button className="avatar" onClick={show}>
      </button>
      { prompt && ( 
        <PromptBox onDataReturn={handleDataReturn} type='logout'/>
      )}

      {dropdown && (
        <div className="dropdown">
            <p id="sign-out" onClick={logout}>
              sign-out
            </p>
            <p id="delete">
              Delete account
            </p>
          </div>
    )
    }
    </div>
  )
}

  export default Avatar;
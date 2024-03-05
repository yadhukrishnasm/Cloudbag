import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './avatar.css'
import {PromptBox}  from './prompt-box'


const Avatar=({ username }) => {
  const Navigate = useNavigate()
  const [dropdown,setdropdown] = useState(false);
  const [prompt,setprompt] = useState(false)
  const [type,setType] = useState('')

  const handleDataReturn = (data,key)=>{
  if(key === 'delete'){
    try{
      fetch('http://localhost:5000/deleteacc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userid : sessionStorage.getItem('userid')})
      }) 
      .then( response =>{
        console.log(`Response from the server ${response}`)
      })
      .catch((error)=>{
        console.log(`error while fetching data from server : ${error}`)
      })

    }catch(error){
      console.log(`client error while deleting the accout :${error}`)
    }

  }
  else if(data === true){
      sessionStorage.clear('userid');
      Navigate('/')  
  }
  else if(data === false){
    setprompt(false)}
  }

  const show =()=>{
      setdropdown(!dropdown)
    }

  const showPrompt =(message)=>{  
    setprompt(!prompt)
    setType(message)
  }

  return (
    <div >
      <span id='username'>{username}</span>
      <button className="avatar" onClick={show}>
      </button>

      {dropdown && (
        <div className="dropdown">
            {prompt && ( 
              <PromptBox onDataReturn={handleDataReturn} content={type}/>
            )}

            <p id="sign-out" onClick={() =>showPrompt('Logout')}>
              sign-out
            </p>
            <p id="delete" onClick={() => showPrompt('Delete')}>
              Delete account
            </p>
          </div>
    )}
    </div>
  )
}

export default Avatar
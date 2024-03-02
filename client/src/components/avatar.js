import React, { useState } from 'react';
import './avatar.css'

const Avatar=({ username }) => {
const [dropdown,setdropdown] = useState(false);

const show =()=>{
    setdropdown(!dropdown)
  }

  return (
    <div >
       <span id='username'>{username}</span>
      <button className="avatar" onClick={ show }>
      </button>

      {dropdown && (
        <div className="dropdown">
            <p id="sign-out">
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
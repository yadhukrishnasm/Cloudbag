import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from './avatar';
import './navbar.css';

export const Navbar = ({username})=>{
  ;
  return (
    <div>
      <div className="nav">
        <div id='left'>
          <Link to ="/home" id="logo">Cloudbag</Link>
        </div>
        <div id="right">
            <span id='links'>
              <Link className ='link' to ="/ar">AR</Link>
              <Link className ='link' to ="/gramma">Cloudspell</Link>
            </span>
            <span id='user'>
              <span id='username'>{username}</span>
              <Avatar/>  
            </span>
        </div>
      </div>
    </div>
  )
}

import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from './avatar';
import './navbar.css';

export const Navbar = ()=>{
  return (
    <div>
      <div className="nav">
        <Link to ="/home" id='logo'>Cloudbag</Link>
        <p id='links'>
          <Link to ="/ar">AR</Link>
          <Link to ="/Cloudspell">Cloudspell</Link>
          <p>Username</p>
          <Avatar/> 
        </p>
      </div>
    </div>
  )
}

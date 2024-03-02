import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import Avatar from './avatar';
import './navbar.css';

export const Navbar = ({username})=>{
  const [shouldDisplay, setShouldDisplay] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const currentEndpoint = location.pathname;

    if (currentEndpoint === '/' || currentEndpoint === '/register') {
      setShouldDisplay(false);
    } else {
      setShouldDisplay(true);
    }
  }, [location.pathname]);
  return (
    <div>
      <div className="nav">
        <div id='left'>
          <Link to ="/home" id="logo">Cloudbag</Link>
        </div>

        {shouldDisplay && (
          <div id="right">
                <span id='links'>
                  <Link className ='link' to ="/ar">AR</Link>
                  <Link className ='link' to ="/gramma">Cloudspell</Link>
                </span>
                <span id='user'>
                  <Avatar username = {username}/>  
                </span>
          </div>
          )}
      </div>
    </div>
  )
}

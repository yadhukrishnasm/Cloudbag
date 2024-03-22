import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import Avatar from './avatar';
import './navbar.css';

export const Navbar = ()=>{
  const [shouldDisplay, setShouldDisplay] = useState(true);
  const location = useLocation();
  const [links,setlinks] = useState(["AR","Cloudspell"])
  const username = sessionStorage.getItem("username")

  useEffect(() => {
    const currentEndpoint = location.pathname;

    if (currentEndpoint === '/' || currentEndpoint === '/register') {
      setShouldDisplay(false);
    } else {
      setShouldDisplay(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const currentEndpoint = location.pathname;
    if (currentEndpoint === '/gramma') {
      setlinks(["AR","Home","/main_homepage/"+username]);
    }else{
      setlinks(["AR","Cloudspell","/gramma"])
    }
  }, [location.pathname]);

  const redirectToARPage = () => {
    window.location.href = 'http://localhost:5000/ar'; 
};


  return (
    <div>
      <div className="nav">
        <div id='left'>
          <Link to ="/" id="logo">Cloudbag</Link>
        </div>

        {shouldDisplay && (
          <div id="right">
                <span id='links'>
                  <span className ='link' onClick={redirectToARPage}>{links[0]}</span>
                  <Link className ='link' to ={links[2]}>{links[1]}</Link>
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

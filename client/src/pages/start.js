import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/start.css';


export default function Start() {

    useEffect(
        () => {

        }
    );
    return (
        <div class="body-frame">
            <div class="top-bar">
            <Link to="/"id=''>Login</Link>
            <span class="space-between"></span>
            <Link to="/register" id=''>Register</Link>
            <span class="space-between"></span>
            </div>
            <div class="mid-bar">
            <div class="threed-text">
    <span>C</span>
    <span>l</span>
    <span>o</span>
    <span>u</span>
    <span>d</span>
    <span>b</span>
    <span>a</span>
    <span>g</span>
  </div>
            </div>
            <div class="about-bar">
                <h2>About</h2>
                <p>Introducing Cloudbag: Your ultimate study
                     partner. This web app redefines studying.
                      Cloud storage lightens your load, quick
                       access for reviews. AI support boosts
                        learning, while smart note-taking 
                        simplifies. Embrace Cloudbag for 
                        effortless, efficient education.</p>
            </div>
            <div class="bottom-bar"></div>
        </div>
        );
}
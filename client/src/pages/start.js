import React from 'react';
import { Link } from 'react-router-dom';
import './styles/start.css';


export default function Start() {
    return (
        <div class="body-frame">
            <div class="top-bar">
                {/* <Link to="/login"id=''>Login</Link>
                <span class="space-between"></span>
                <Link to="/register" id=''>Register</Link>
                <span class="space-between"></span> */}
                <Link to='/login'>
                    <div className="get-started">
                        get started
                    </div>
                </Link>
            </div>
            <div class="mid-bar">
                <div class="about-bar">
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
                        <div class="about-box">Introducing Cloudbag: Your ultimate study
                            partner. This web app redefines studying.
                            Cloud storage lightens your load, quick
                            access for reviews. AI support boosts
                            learning, while smart note-taking 
                            simplifies. Embrace Cloudbag for 
                            effortless, efficient education.
                        </div>
                    </div>
                <div className="homepage-image"></div>
            </div>
            
            <div class="bottom-bar"></div>
        </div>
        );
}
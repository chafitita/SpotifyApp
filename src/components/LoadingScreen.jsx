import React from "react";
import '../css/LoadingScreen.css'
import background from '../assets/background-op3.gif'

function LoadingScreen () {
    return(
        <div className="loading-screen">
            <img className="background" src={background}/>
            <p className="loading-text">Tuning Synthify...</p>
        </div>
    );
}

export default LoadingScreen;
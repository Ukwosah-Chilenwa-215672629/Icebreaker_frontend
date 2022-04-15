import React, { useEffect } from 'react';
import './About.css';
import landingPage from '../img/Image5.PNG';
import image2 from '../img/Image4.PNG';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-container">
      <div lassName="about-box">
      <img className="home_image3" src={landingPage} alt=""></img>
      </div>
    </div>
  );
}
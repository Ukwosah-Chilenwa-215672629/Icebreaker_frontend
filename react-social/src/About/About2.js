import React, { useEffect } from 'react';
import './About.css';
import image from '../img/Image2.PNG';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-container2">
      <div lassName="about-box2">
        
        <img className="home_image2" src={image} alt=""></img>
      </div>
    </div>
  );
}

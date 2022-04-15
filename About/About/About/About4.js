import React, { useEffect } from 'react';
import './About.css';
import image from '../img/Image7.PNG';
import image2 from '../img/Image8.png';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-container2">
      <div lassName="about-box2">     
        <img className="home_image6" src={image2} alt=""></img>
        <img className="home_image5" src={image} alt=""></img>
      </div>
    </div>
  );
}

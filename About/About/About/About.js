
import React, { useEffect } from 'react';
import './About.css';
import image from '../img/Image1.PNG';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-container2">
      <div lassName="about-box2">
        <img className="home_image" src={image} alt=""></img>
        <div className='video-container'>
        <iframe width="420" height="315"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>
      </div>
      </div>
    </div>
  );
}
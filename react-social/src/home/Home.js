// import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';
import image from '.././img/iphone.jpg';
import ShareButtons from '../ShareButtons/ShareButtons';
import About from '../About/About';
import About2 from '../About/About2';
import About3 from '../About/About3';
import About4 from '../About/About4';
import Footer from '../common/Footer';
import video from '../video/icebreaker-landing-video.mp4';
import { Link } from 'react-scroll';
class Home extends Component {
  render() {
    return (
      <div>
        <div className="">
          <div className="showcase-container">
            <video className="videoTag" autoPlay loop muted>
              <source src={video} type="video/mp4" />
            </video>
            <h1 className="home-ice-text">
              Ice<span className="color-text-home">Breaker</span>
            </h1>
            <p> Break The Ice And Connect With New People Near You.</p>

            <div className="btn-space">
              <NavLink to="/signup">
                {' '}
                <button className="btn-style">
                  {' '}
                  <span className="text-colour"> SIGN UP </span>
                </button>
              </NavLink>

              <div>
                <Link activeClass="active" to="home" spy={true} smooth={true}>
                  <div class="downArrow bounce">
                    <img
                      width="50"
                      height="50"
                      alt=""
                      src="https://www.freeiconspng.com/thumbs/white-arrow-png/white-down-arrow-png-2.png"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>


          <About />
          <About2 />
          <About3 />
          <About4/>
          <div>
            <p className="socialF">
              {' '}
              Follow our social media for more about us.{' '}
            </p>
          </div>

          <ShareButtons />

          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;

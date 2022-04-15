import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faLinkedin,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import "./ShareButtons.css"


export default function ShareButtons() {
    return(
        <div className='center'>
        <div>
                 <a href="http://www.Instagram.com/c/Icebreaker"
        className="instagram social">
            <FontAwesomeIcon icon={faInstagram} size="2x"/>
        </a>

        <a href="http://www.facebook.com/c/Icebreaker"
        className="facebook social">
            <FontAwesomeIcon icon={faFacebook} size="2x"/>
        </a>

        <a href="http://www.Twitter.com/c/Icebreaker"
        className="twitter social">
            <FontAwesomeIcon icon={faTwitter} size="2x"/>
        </a>

        <a href="http://www.Linkedin.com/c/Icebreaker"
        className="linkedin social">
            <FontAwesomeIcon icon={faLinkedin} size="2x"/>
        </a>

        <a href="http://www.Youtube.com/c/Icebreaker"
        className="youtube social">
            <FontAwesomeIcon icon={faYoutube} size="2x"/>
        </a>
        </div>
        </div>
    );
}
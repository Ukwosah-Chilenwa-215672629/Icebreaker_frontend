import React, { Component, Button } from 'react';
import './Rightbar.css';
import { Link, NavLink } from 'react-router-dom';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Modal from 'react-modal';

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <div>
        <div>
          <NavLink to="/VideoEditor">
            {' '}
            <button className="btn-style">
              {' '}
              <span className="text-colour"> Video </span>
            </button>
          </NavLink>
          <NavLink to="/profileEditor">
            {' '}
            <button className="btn-style">
              {' '}
              <span className="text-colour"> Edit Preferences </span>
            </button>
          </NavLink>
          <NavLink to="/DailyQuestions">
            {' '}
            <button className="btn-style">
              {' '}
              <span className="text-colour"> Daily Questionnare </span>
            </button>
          </NavLink>
        </div>
      </div>
    );
  };

  const ProfileRightbar = () => {
    return (
      <div>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/2.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/3.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/4.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/5.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/6.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

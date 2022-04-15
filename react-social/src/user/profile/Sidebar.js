import React, { Component, Button } from 'react';
import './Sidebar.css';
import {
  FaFacebookMessenger,
  FaGrinHearts,
  FaHandsHelping,
  FaCameraRetro,
  FaPhoneAlt,
  FaSpider,
  FaHome,
  FaPhotoVideo,
  FaJediOrder,
  FaHeartbeat,
  FaHippo,
  FaUserSecret,
} from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <div className="sidebarSpacing">
            <li className="sidebarListItem">
              <FaHome />
              <NavLink to="/profile">
                {' '}
                <span className="sidebarListItemText"> Profile </span>
              </NavLink>
            </li>
          </div>

          <div className="sidebarSpacing">
            <li className="sidebarListItem">
              <FaFacebookMessenger />
              <NavLink to="/Chat">
                {' '}
                <span className="sidebarListItemText"> Messages </span>
              </NavLink>
            </li>
          </div>
          <div className="sidebarSpacing">
            <li className="sidebarListItem">
              <FaGrinHearts />
              <NavLink to="/matchPage">
                {' '}
                <span className="sidebarListItemText">
                  {' '}
                  Matches For The Day{' '}
                </span>
              </NavLink>
            </li>
          </div>
          <hr className="sidebarHr" />
          <div className="sidebarSpacing">
            <li className="sidebarListItem">
              <FaCameraRetro />
              <NavLink to="/PhoneVerification">
                {' '}
                <span className="sidebarListItemText">
                  {' '}
                  Photo Verification{' '}
                </span>
              </NavLink>
            </li>
          </div>

          <div className="sidebarSpacing">
            <li className="sidebarListItem">
              <FaPhoneAlt />
              <NavLink to="/sendotp">
                {' '}
                <span className="sidebarListItemText">
                  {' '}
                  Phone Verification{' '}
                </span>
              </NavLink>
            </li>
          </div>
          <hr className="sidebarHr" />
          <div className="sidebarSpacing">
            <li className="sidebarListItem">
              <FaPhotoVideo />
              <NavLink to="/VideoEditor">
                {' '}
                <span className="sidebarListItemText"> Video </span>
              </NavLink>
            </li>
          </div>
          <div className="sidebarSpacing">
            <li className="sidebarListItem">
              <FaHeartbeat />
              <NavLink to="/interestPage">
                {' '}
                <span className="sidebarListItemText"> Update Interests </span>
              </NavLink>
            </li>
          </div>
          <div className="sidebarSpacing">
            <li className="sidebarListItem">
              <FaHippo />
              <NavLink to="/profileEditor">
                {' '}
                <span className="sidebarListItemText"> Edit Preference </span>
              </NavLink>
            </li>
          </div>
        </ul>

        <hr className="sidebarHr" />
        <div className="sidebarSpacing">
          <li className="sidebarListItem">
            <FaHandsHelping />
            <NavLink to="/Help">
              {' '}
              <span className="sidebarListItemText"> Help </span>
            </NavLink>
          </li>
        </div>
        <div className="sidebarSpacing">
          <li className="sidebarListItem">
            <FaSpider />
            <NavLink to="/ContactSupport">
              {' '}
              <span className="sidebarListItemText"> Report A Bug </span>
            </NavLink>
          </li>
        </div>

        <div className="sidebarSpacing">
          <li className="sidebarListItem">
            <FaSpider />
            <NavLink to="/DailyQuestions">
              {' '}
              <span className="sidebarListItemText"> Questions </span>
            </NavLink>
          </li>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState, Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import logo from '.././img/logo.png';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './AppHeader.css';
import { grey } from '@mui/material/colors';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
const useStyles = makeStyles((theme) => ({
  colorText: {
    color: '#e699ff',
  },
}));

class AppHeader extends Component {
  render() {
    var currentUrl = window.location.pathname;
    var navlink;
    if (currentUrl === '/profile') {
      //  navlink = <NavLink to="/Chat">Start Chatting</NavLink>;
    }
    //console.log(currentUrl);
    //console.log("HEADER");

    // const classes = useStyles();
    return (
      <header className="app-header">
        <div className="container">
          <div className="app-branding">
            <img className="logo" src={logo} />
            <Link to="/" className="app-title">
              Ice<span className="color-text-home">Breaker.</span>{' '}
            </Link>
          </div>
          <div className="app-options">
            <nav className="app-nav">
              <ul>
                <li>{navlink}</li>
              </ul>
            </nav>
          </div>

          <div className="app-options">
            <nav className="app-nav">
              {this.props.authenticated ? (
                <ul>
                  <li>
                    <NavLink to="/profile">
                      <Tooltip title="Profile Page">
                        <IconButton>
                          <HomeIcon
                            fontSize="medium"
                            sx={{ color: grey[100] }}
                          />
                        </IconButton>
                      </Tooltip>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/matchPage">
                      <Tooltip title="Matches">
                        <IconButton>
                          <FavoriteIcon
                            fontSize="medium"
                            sx={{ color: grey[100] }}
                          />
                        </IconButton>
                      </Tooltip>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Chat">
                      <Tooltip title="Messages">
                        <IconButton>
                          <ForumIcon
                            fontSize="medium"
                            sx={{ color: grey[100] }}
                          />
                        </IconButton>
                      </Tooltip>
                    </NavLink>
                  </li>
                  <li>
                    <Tooltip title="Logout">
                      <IconButton>
                        <LogoutIcon
                          fontSize="medium"
                          sx={{ color: grey[100] }}
                          onClick={this.props.onLogout}
                        />
                      </IconButton>
                    </Tooltip>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <NavLink to="/ContactPage"> Support</NavLink>
                  </li>
                  {/* <li>
                                            <NavLink to="/login">Login</NavLink>        
                                        </li> */}
                  <li>
                    <NavLink to="/login">
                      <button className="btn-styl">
                        {' '}
                        <span className="text-colour">Login </span>
                      </button>
                    </NavLink>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default AppHeader;

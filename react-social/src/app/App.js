import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import ContactPage from '../ContactPage/ContactPage';
import ProfileRend from '../user/MatchPage/ProfileRend';
import Profile from '../user/profile/Profile';
import profileEditor from '../user/ProfileEditor/profileEditor';
import Chat from '../user/Chat/Chat';
import CoverPhotoEditor from '../user/CoverPhotoEditor/CoverPhotoEditor';
import ImageEditor from '../user/ImageEditor/ImageEditor';
import VideoEditor from '../user/VideoEditor/VideoEditor';
import PhoneVerification from '../user/PhoneVerification/PhoneVerification';
import interestPage from '../user/InterestPage/interestPage';
import matchPage from '../user/MatchPage/matchPage';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import { Redirect } from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,

      
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    

    
  
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    Alert.success("You're safely logged out!");
  }

 

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  
  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader
            authenticated={this.state.authenticated}
            onLogout={this.handleLogout}
            
          />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route
              path="/ProfileRend"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              // userObj= {this.this.state.currentUser}
             
              component={ProfileRend}
            > </Route>
            <PrivateRoute
              path="/profile"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              
              
              component={Profile}
              
            ></PrivateRoute>
            <Route
              path="/profileEditor"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              
              component={profileEditor}
            ></Route>
             <PrivateRoute
              path="/ImageEditor"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ImageEditor}
            ></PrivateRoute>
            
            <PrivateRoute
            path="/VideoEditor"
            authenticated={this.state.authenticated}
            currentUser={this.state.currentUser}
            component={VideoEditor}
          ></PrivateRoute>

          <PrivateRoute
              path="/CoverPhotoEditor"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CoverPhotoEditor}
            ></PrivateRoute>

            <PrivateRoute
              path="/Chat"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Chat}
            ></PrivateRoute>

<PrivateRoute
              path="/interestPage"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={interestPage}
            ></PrivateRoute>
{/* <PrivateRoute
              path="/ProfileRend"
              // authenticated={this.state.authenticated}
              // currentUser={this.state.currentUser}
              // userObj= {this.this.state.currentUser}
              component={ProfileRend}
            ></PrivateRoute> */}

<PrivateRoute
           path="/matchPage"
              
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              
   
              component={matchPage}
            ></PrivateRoute>
           
            

        <PrivateRoute
              path="/PhoneVerification"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={PhoneVerification}
            ></PrivateRoute>

            <Route
              path="/ContactPage"
              render={(props) => <ContactPage {...props} />}
            ></Route>
            <Route
              path="/login"
              render={(props) => (
                <Login authenticated={this.state.authenticated} {...props} />
              )}
            ></Route>
            <Route
              path="/signup"
              render={(props) => (
                <Signup authenticated={this.state.authenticated} {...props} />
              )}
            ></Route>
            <Route
              path="/oauth2/redirect"
              component={OAuth2RedirectHandler}
            ></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert
          stack={{ limit: 3 }}
          timeout={3000}
          position="top-right"
          effect="slide"
          offset={65}
        />
      </div>
    );
  }
}

export default App;

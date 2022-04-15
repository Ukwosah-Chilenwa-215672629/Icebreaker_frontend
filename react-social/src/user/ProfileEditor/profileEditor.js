import React, { Component, useState } from 'react';
import '../signup/Signup.css';
import Footer from '../../common/Footer';
import { RangeStepInput } from 'react-range-step-input';
import axios from 'axios';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WcIcon from '@mui/icons-material/Wc';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import MapIcon from '@mui/icons-material/Map';
import Geocode from 'react-geocode';
import { Paper, TextField, Button, IconButton, Box } from '@material-ui/core';

/*class Signup extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div className="signup-container">
          <div className="signup-content">
            <h1 className="signup-title">Edit Your Preferenes</h1>
            <SignupForm {...this.props} />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}*/

class ProfileEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'kaneezeyo@gmail.com',
      inpersonRelationship: '',
      genderPreference: '',
      latitude: '',
      longitude: '',
      distance: '',
      city: '',
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onValueChangeGender = this.onValueChangeGender.bind(this);
    //  this.onValueLongLat = this.onValueLongLat.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.getCity = this.getCity.bind(this);
    this.onValueChangeDistance = this.onValueChangeDistance.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationError
      );
    } else {
      alert('Geolocation is not supported by this browser');
    }
  }

  getCoordinates(position) {
    // this.setState({})
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    this.getCity();
  }

  getCity() {
    let a;
    let b;
    let c;
    Geocode.setApiKey('AIzaSyB4zZAo0SMztvmEryV2bwWShoYzEL5cEMo');
    a = this.state.latitude;
    b = this.state.longitude;
    let aText = a.toString();
    let bText = b.toString();
    Geocode.fromLatLng(aText, bText).then(
      (response) => {
        const address = response.results[0].address_components[2].long_name;
        console.log(address);
        this.setState({
          city: address,
        }); //  setCitys(address);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.');
        break;
      default:
        alert('An error occured');
    }
  }

  _setCity = async () => {
    const article = {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      id: this.currentUser.id,
      city: this.state.city,
    };
    await axios
      .post('http://localhost:8080/user/me/updateLocation', article)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  //Relationships
  onValueChange(event) {
    this.setState({
      inpersonRelationship: event.target.value,
    });
  }

  //Distance
  onValueChangeDistance(event) {
    this.setState({
      distance: event.target.value,
    });
  }

  //GenderPreferenece
  onValueChangeGender(event) {
    this.setState({
      genderPreference: event.target.value,
    });
  }

  formSubmit(event) {
    event.preventDefault();
    // console.log(this.state.inpersonRelationship);
    //console.log(this.state.genderPreference);
  }

  render() {
    return (
      <div
        style={{
          flex: 9.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F8F8F8',
          height: '100vh',
        }}
      >
        <Paper
          elevation={5}
          style={{ alignItems: 'center', width: 500, height: 550 }}
        >
          <div className="div-daily">
            <h1>Edit Your Preferences</h1>
            <form onSubmit={this.formSubmit}>
              <div className="form-item">
                <div className="div-icon">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      style={{
                        padding: 5,
                      }}
                    >
                      <LocationCityIcon />
                    </div>
                    <p> Friendship Location</p>
                  </div>
                  <RangeStepInput
                    min={0}
                    max={50}
                    distance={this.state.distance}
                    step={5}
                    onChange={this.onValueChangeDistance}
                    style={{ color: 'blue' }}
                  />
                  <p>
                    {' '}
                    Finding new connections within {
                      this.state.distance
                    } km.{' '}
                  </p>
                </div>
              </div>
              <div className="form-item">
                <div className="radio">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      style={{
                        padding: 5,
                      }}
                    >
                      <WcIcon />
                    </div>
                    <p> Gender Preference </p>
                  </div>
                  <label>
                    <input
                      type="radio"
                      value="Male"
                      checked={this.state.genderPreference === 'Male'}
                      onChange={this.onValueChangeGender}
                    />
                    Male
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="Female"
                      checked={this.state.genderPreference === 'Female'}
                      onChange={this.onValueChangeGender}
                    />
                    Female
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="Other"
                      checked={this.state.genderPreference === 'Other'}
                      onChange={this.onValueChangeGender}
                    />
                    Other
                  </label>
                </div>
              </div>

              <div className="form-item">
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      style={{
                        padding: 5,
                      }}
                    >
                      <VpnLockIcon />
                    </div>
                    <p>Relationship Style </p>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Virtual"
                        checked={this.state.inpersonRelationship === 'Virtual'}
                        onChange={this.onValueChange}
                      />
                      Virtual
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="In-Person"
                        checked={
                          this.state.inpersonRelationship === 'In-Person'
                        }
                        onChange={this.onValueChange}
                      />
                      In-Person
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-item">
                <div className="div-city">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      style={{
                        padding: 5,
                      }}
                    >
                      <MapIcon />
                    </div>
                    <p> Home City/Town </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <button
                      className="btn-style"
                      onClick={() => this.getLocation()}
                    >
                      Click to get City
                    </button>
                    <p> We detected: {this.state.city}</p>
                  </div>
                </div>
              </div>
              <div className="form-item">
                <button type="" className="btn btn-block btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Paper>
      </div>
    );
  }
}

export default ProfileEditor;

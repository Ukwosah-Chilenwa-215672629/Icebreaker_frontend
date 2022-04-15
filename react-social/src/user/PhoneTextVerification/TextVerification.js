import React from 'react';
import { Paper, TextField, Button, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import '../profile/Profile.css';
import Otp from '../PhoneTextVerification/Otp';
import Sidebar from '../profile/Sidebar';
import Alert from 'react-s-alert';

function isNumeric(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}

export default class TextVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '1',
      pno: '',
      otpShow: false,
      otp: '',
    };
  }

  _getCode = async () => {
    const e = '+' + '1' + this.state.pno;
    console.log('yes');
    const article = {
      id: 1,
      phonenumber: e,
    };
    await axios
      .post('http://localhost:8080/sendotp', article)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  verifyCode = async () => {
    const e = '+' + '1' + this.state.pno;
    console.log('yes');
    const articles = {
      id: 1,
      phonenumber: e,
      otp: this.state.otp,
    };
    console.log(this.state.otp);
    await axios
      .post('http://localhost:8080/verifyotp', articles)
      .then((data) => {
        console.log(data);
        console.log(typeof data);
        var firstKey = data.data;
        console.log(typeof firstKey);
        if (firstKey) {
          Alert.success('Your phone number has been verified.');
        } else {
          Alert.error('There was an error with your verification code.');
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="profile">
        <Sidebar />
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
            style={{
              padding: 20,
              width: 450,
              marginBottom: 60,
            }}
          >
            {!this.state.otpShow ? (
              <h3 style={{ marginLeft: 10, color: '#9f9f9f' }}></h3>
            ) : (
              <IconButton
                onClick={() => {
                  this.setState({ otpShow: false, otp: '' });
                }}
                size="small"
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            {!this.state.otpShow ? (
              <h2 className="div-daily">Enter your Phone Number</h2>
            ) : (
              <h3>Enter the OTP</h3>
            )}
            {this.state.otpShow ? (
              <p>
                A One Time Password has been sent to your phone number for
                verification puposes.
              </p>
            ) : null}
            <div>
              {!this.state.otpShow ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 'auto',
                    justifyContent: 'space-around',
                  }}
                >
                  <div>
                    <TextField
                      id="phone"
                      label="Phone"
                      color="#2098f3"
                      value={this.state.pno}
                      onChange={(e) => {
                        if (
                          (e.target.value[e.target.value.length - 1] >= '0' &&
                            e.target.value[e.target.value.length - 1] <= '9') ||
                          !e.target.value
                        ) {
                          this.setState({ pno: e.target.value });
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <Otp
                  otp={this.state.otp}
                  setOtp={(val) => this.setState({ otp: val })}
                />
              )}
              {this.state.otpShow ? (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: 5,
                  }}
                >
                  Didn't receive an OTP?{' '}
                  <Button
                    onClick={() => this._getCode()}
                    color="primary"
                    style={{ textTransform: 'none', fontSize: 15 }}
                  >
                    Resend OTP
                  </Button>
                </div>
              ) : null}
              <div
                style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}
              >
                <Button
                  variant="contained"
                  disabled={
                    this.state.pno.length !== 10 ||
                    this.state.code === null ||
                    !isNumeric(this.state.pno) ||
                    (this.state.otpShow && this.state.otp.length !== 6)
                  }
                  color="#2098f3"
                  style={{
                    color: 'white',
                    marginLeft: 'auto',
                    textTransform: 'none',
                    backgroundColor: '#2098f3',
                  }}
                  onClick={() => {
                    if (this.state.otpShow) {
                      this.verifyCode();
                    } else {
                      this._getCode();
                      this.setState({ otpShow: true });
                    }
                  }}
                >
                  Verify
                </Button>
              </div>
              {!this.state.otpShow ? (
                <p className="div-daily-text">
                  By tapping Verify an SMS may be sent. Message & data rates may
                  apply.
                </p>
              ) : null}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 10,
                }}
              ></div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

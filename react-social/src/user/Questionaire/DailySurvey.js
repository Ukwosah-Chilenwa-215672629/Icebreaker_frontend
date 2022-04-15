import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './DailySurvey.css';
import { Paper, TextField, Button, IconButton, Box } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import '../profile/Profile.css';

const questions = [
  {
    question: 'How was your day?',
  },
  {
    question: 'What type of mood are you in right now?',
  },
  {
    question: 'What type of self care activities did you do today?',
  },
  {
    question: 'What are you the most proud of today?',
  },
  {
    question: 'Did you feel like you accomplished anything today?',
  },
  {
    question: 'How would you rate your day?',
  },
  {
    question: 'Describe the worst part of your day?',
  },
];
export default class DailySurvery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.currentUser.id,
      timestamp: Date().toLocaleString(),
      s1: '',
      s2: '',
      s3: '',
      index: '',
      index2: '',
      index3: '',
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleChangeS1 = this.handleChangeS1.bind(this);
    this.handleChangeS2 = this.handleChangeS2.bind(this);
    this.handleChangeS3 = this.handleChangeS3.bind(this);
  }

  componentDidMount() {
    const ind1 = Math.floor(Math.random() * questions.length);
    const ind2 = Math.floor(Math.random() * questions.length);
    const ind3 = Math.floor(Math.random() * questions.length);
    this.setState({ index: ind1 });
    this.setState({ index2: ind2 });
    this.setState({ index3: ind3 });
  }

  handleChangeS1 = (e) => {
    this.setState({ s1: e.target.value });
  };
  handleChangeS2 = (e) => {
    this.setState({ s2: e.target.value });
  };
  handleChangeS3 = (e) => {
    this.setState({ s3: e.target.value });
  };
  handleButton = async () => {
    try {
      const article = {
        id: this.state.id,
        one: this.state.s1,
        two: this.state.s2,
        three: this.state.s3,
      };
      console.log(article);
      const axiosPostCall = await axios.post(
        'http://localhost:8080/user/me/UpdateQ?id=' +
          this.state.id +
          '&one=' +
          this.state.s1 +
          '&two=' +
          this.state.s2 +
          '&three=' +
          this.state.s3
      );
    } catch (error) {
      console.log('error');
    }
  };

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
          style={{ alignItems: 'center', width: 600, height: 600 }}
        >
          <div className="div-daily">
            <h1>Daily Survey</h1>
            <div
              style={{
                padding: 5,
              }}
            >
              <p1>
                {questions[this.state.index] &&
                  questions[this.state.index].question}
              </p1>
            </div>
            <TextField
              value={this.state.s1}
              onChange={this.handleChangeS1}
              style={{
                width: 400,
              }}
            ></TextField>

            <br></br>

            <p1>
              {' '}
              {questions[this.state.index2] &&
                questions[this.state.index2].question}
            </p1>
            <br></br>
            <TextField
              value={this.state.s2}
              onChange={this.handleChangeS2}
              style={{
                width: 400,
              }}
            ></TextField>

            <br></br>

            <p1>
              {' '}
              {questions[this.state.index3] &&
                questions[this.state.index3].question}
            </p1>
            <br></br>
            <TextField
              value={this.state.s3}
              onChange={this.handleChangeS3}
              style={{
                width: 400,
              }}
            ></TextField>
            <br></br>

            <div className="button-daily">
              <button className="btn-style" onClick={this.handleButton}>
                Submit
              </button>

              <NavLink to="/profile">
                <button className="btn-style">Skip</button>
              </NavLink>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

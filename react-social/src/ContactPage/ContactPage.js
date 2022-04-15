import { LengthRequired } from 'http-errors';
import React, { Component } from 'react';
import Footer from '../common/Footer';
import './ContactPage.css';

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    };
  }

  render() {
    
    return (
      <body>
        <div class="container-cs">
          <div class="container-center">
            <h2>Contact Us</h2>
          </div>
          <div class="row">
            <div class="column form">
              <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onNameChange.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="contact-back"
                    placeholder="Email Address"
                    aria-describedby="emailHelp"
                    value={this.state.email}
                    onChange={this.onEmailChange.bind(this)}
                  />
                </div>
                <div className="col">
                  <div className="form-group solo">
                    <textarea
                      placeholder="Message"
                      value={this.state.message}
                      onChange={this.onMessageChange.bind(this)}
                    ></textarea>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group solo right">
                    <button type="submit" className="button-17">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div class="column-img">
              <h2> Developers </h2>
              <div class="grid">
                <div class="cell">
                  <ul class="ul">
                    <li>
                      <img
                        class="img-icon"
                        src={require('../img/person-icon.png')}
                      ></img>
                      <span>Ali</span>
                    </li>
                    <li>
                      <img
                        class="img-icon"
                        src={require('../img/person-icon.png')}
                      ></img>
                      <span>Brian</span>
                    </li>
                    <li>
                      <img
                        class="img-icon"
                        src={require('../img/person-icon2.png')}
                      ></img>
                      <span>Lan</span>
                    </li>
                  </ul>
                </div>

                <div class="cell">
                  <ul class="ul">
                    <li>
                      <img
                        class="img-icon"
                        src={require('../img/person-icon.png')}
                      ></img>
                      <span>Victor</span>
                    </li>
                    <li>
                      <img
                        class="img-icon"
                        src={require('../img/person-icon2.png')}
                      ></img>
                      <span>Kaneez</span>
                    </li>
                    <li>
                      <img
                        class="img-icon"
                        src={require('../img/person-icon.png')}
                      ></img>
                      <span>Solomon</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    );
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {}
}

export default ContactPage;

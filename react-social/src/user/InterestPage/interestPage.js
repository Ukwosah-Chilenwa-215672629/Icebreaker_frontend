import React, { Component, useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import Dropdown from './Dropdown';
import './interestPage.css';
import Footer from '../../common/Footer';
import axios from 'axios';
import { FACEBOOK_AUTH_URL } from '../../constants';
// const {selected, setSelected}  = useState("");

class interest extends Component {
  constructor(props){
    super(props);
    console.log(props)
    console.log("done")
    console.log(this.props.currentUser.email)

    this.state = {
     email:this.props.currentUser.email,
     name: this.props.currentUser.name,
     personalityType: "",
     movie: false,
     videoGame:false,
     music:false,
     sport:false,
     gym: false,
     calisthenics:false,
     cycling:false,
     hiit: false,
     hiking:false,
     rockClimbing:false,
     weightLifting:false,
     yoga:false,
     horseRiding:false,
     dancing:false,
     polytheism:false,
     monotheism:false,
     atheism:false,
     animism:false,
     totemism:false,
     social:false,
     cognitive:false,
     physical:false
    }
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton =  async function (event) {
    const buttonValue = event.target.value;
    console.log(buttonValue);
    if (buttonValue == "gym") {
       await this.setState({gym:true});
      
    }
    if (buttonValue == "callisthenics") {
      await this.setState({calisthenics:true});
     
    }
    if (buttonValue == "cyclin") {
      await this.setState({cycling:true});
      
    }
    if (buttonValue == "hiking") {
      await this.setState({hiking:true});
      
    }
    if (buttonValue == "rockClimbing") {
      await this.setState({rockClimbing:true});
      
    }
    if (buttonValue == "HIIT") {
      await this.setState({hiit:true});
     
    }
    if (buttonValue == "horseRiding") {
      await this.setState({horseRiding:true});
      
    }
    if (buttonValue == "weightLifting") {
      await this.setState({weightLifting:true});
      
    }
    if (buttonValue == "yoga") {
      await this.setState({yoga:true});
      
    }
    if (buttonValue == "dancing") {
      await this.setState({dancing:true});
      
    }
    if (buttonValue == "social") {
      await this.setState({social:true});
     
    }
    if (buttonValue == "cognitive") {
      await this.setState({cognitive:true});
     
    }
    if (buttonValue == "physical") {
      await this.setState({physical:true});
     
    }
    if (buttonValue == "movie") {
      await this.setState({movie:true});
      
    }
    if (buttonValue == "videoGame") {
      await this.setState({videoGame:true});
     
    }
    if (buttonValue == "music") {
      await this.setState({music:true});
     
    }
    if (buttonValue == "sport") {
      await this.setState({sport:true});
     
    }
    
    console.log(this.state.movie);
    console.log(this.state.videoGame);
    console.log(this.state.music);
    console.log(this.state.sport);
    console.log(" ");
    // console.log(this.state.art);
    // console.log(this.state.design);
    // console.log(this.state.photography);
    // console.log(this.state.writing);
    // console.log(this.state.singing);
    // console.log(this.state.content);
    // console.log(this.state.crafts);

    // console.log(this.state.buddhism);
    // console.log(this.state.christianity);
    // console.log(this.state.hinduism);
    // console.log(this.state.islam);
    // console.log(this.state.judaism);
    // console.log(this.state.sikhism);
    // console.log(this.state.atheism);

    console.log(this.props.currentUser);
    console.log(this.state.gym);
    console.log(this.state.calisthenics);
    console.log(this.state.cycling);
    console.log(this.state.hiking);
    console.log(this.state.rockClimbing);
    console.log(this.state.hiit);
    console.log(this.state.horseRiding);
    console.log(this.state.weightLifting);
    console.log(this.state.yoga);
    console.log(this.state.dancing);
    console.log(" ");

    console.log(this.state.social);
    console.log(this.state.cognitive);
    console.log(this.state.physical);
    

    const article = { 
      "email": this.state.email,
      "movie": this.state.movie,
      "name": this.state.name,
      "personalityType": this.state.personalityType,
      "videoGame": this.state.videoGame,
      "music": this.state.music,
      "sport": this.state.sport,
      "gym":  this.state.gym,
      "calisthenics": this.state.calisthenics,
      "cycling": this.state.cycling,
      "hiking": this.state.hiking,
      "rockClimbing": this.state.rockClimbing,
      "weightLifting": this.state.weightLifting,
      "yoga": this.state.yoga,
      "horseRiding": this.state.horseRiding,
      "dancing": this.state.dancing,
      "polytheism": this.state.polytheism,
      "monotheism": this.state.monotheism,
      "atheism": this.state.atheism,
      "animism": this.state.animism,
      "totemism": this.state.totemism,
      "social": this.state.social,
      "cognitive": this.state.cognitive,
      "physical": this.state.physical
    };
    axios.post('http://localhost:8080/user/me/changeInterest', article)
        .then(console.log(Response))
        .catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
  }

  

    render() {
      return (
       
        <div >
          <div >
             
            <h1 className="signup-title">Edit Your Preferenes</h1>
            <p>
              pick uo to 3 to find friends with shared experiences.
            </p>
            <ToggleSwitch  /> 
            <p> show on my profile</p>
          </div>
        
       

      
          <div className='personalityType'>
              <div>
              <Dropdown />
              
              </div>
            {' '}
            <button value='movie' className="btn-style"onClick={this.handleButton} >
            movie 
            </button>
          </div >

          <div className='videoGame'>
            <button value='videoGame' className="btn-style"onClick={this.handleButton} >
            videoGame 
              </button>
          </div>

          <div className='music'>
            <button value='music' className="btn-style"onClick={this.handleButton} >
            music 
              </button>
          </div>

          <div className='sports'>
            <button value='sport' className="btn-style"onClick={this.handleButton} >
            sports 
              </button>
          </div>



          <div className='MakingMoves'>
            <h1>New chapters</h1> 
          <button value='newTotown' className="btn-style" onClick={this.handleButton}>
            New to town 
            </button>
            {' '}
            <button value='L_abroad' className="btn-style"onClick={this.handleButton} >
            Living abroad 
            </button>
            <button value='justMoved' className="btn-style" onClick={this.handleButton}>
           Moved to a new country 
            </button>
            <button value='tarvelling' className="btn-style" onClick={this.handleButton}>
            Travelling 
            </button>
            <button value='S_abroad' className="btn-style" onClick={this.handleButton}>
            Studying abroad 
            </button>
          
          </div>


          <div className='Education'>
            <h1>Education</h1>
          <button value='college' className="btn-style" onClick={this.handleButton}>
           In college 
            </button>
            <button value='uni' className="btn-style" onClick={this.handleButton}>
           University 
            </button>
            <button value='newGraduate' className="btn-style" onClick={this.handleButton}>
            Just graduated
            </button>
            <button value='highSchool'className="btn-style" onClick={this.handleButton} >
            High School
            </button>
          </div>


          <div className='Work'>
            <h1>Work</h1>
          <button value='newJob' className="btn-style" onClick={this.handleButton}>
            New Job 
            </button>
            <button value='firstjob' className="btn-style" onClick={this.handleButton}>
            First job 
            </button>
            <button value='careerChange' className="btn-style" onClick={this.handleButton}>
            Changing careers 
            </button>
            <button value='betweenJobs' className="btn-style" onClick={this.handleButton}>
            in-between jobs
            </button>
            <button value='stayHomeParent' className="btn-style" onClick={this.handleButton}>
            Stay at home parent 
            </button>
            <button value='businessOwner' className="btn-style" onClick={this.handleButton}>
            Business owner 
            </button>
            <button value='entrepreneur' className="btn-style" onClick={this.handleButton}>
            Entrepreneur
            </button>
            <button value='military' className="btn-style" onClick={this.handleButton}>
            Military 
            </button>
          </div>


          <div className='Family'>
            <h1>Family</h1>
            <button value='newParent' className="btn-style" onClick={this.handleButton}>
            new parent 
            </button>
            <button value='familyPlan' className="btn-style" onClick={this.handleButton} >
            Planing for a family  
            </button>
            <button value='adoption' className="btn-style" onClick={this.handleButton} >
            adoption journey 
            </button>
            <button value='emptyNester' className="btn-style" onClick={this.handleButton}>
            Empty nester
            </button>
            <button value='fostering' className="btn-style" onClick={this.handleButton}>
            Fostering 
            </button>
            <button value='petParent'className="btn-style" onClick={this.handleButton} >
           pet parent 
            </button>
            
          </div>


          <div className='Creativity'>
            <h1>Creativity </h1>
          <button value='art' className="btn-style" onClick={this.handleButton}>
           Art
            </button>
            <button value='design' className="btn-style" onClick={this.handleButton}>
            Design
            </button>
            <button value='photography' className="btn-style" onClick={this.handleButton}>
            Photography 
            </button>
            <button value='writing' className="btn-style" onClick={this.handleButton} >
            writing 
            </button>
            <button value='singing' className="btn-style" onClick={this.handleButton}>
            singing 
            </button>
            <button value='content' className="btn-style" onClick={this.handleButton}>
            Making Content 
            </button>
            <button value='crafts' className="btn-style" onClick={this.handleButton}>
            Crafts
            </button>
          </div>



          <div className='Faith'>
            <h1>Faith </h1>
          <button value='faith' className="btn-style" onClick={this.handleButton} >
           Buddhism
            </button>
            <button value='christianity' className="btn-style" onClick={this.handleButton} >
            Christianity
            </button>
            <button value='hinduism' className="btn-style" onClick={this.handleButton} >
            Hinduism 
            </button>
            <button value='islam' className="btn-style" onClick={this.handleButton} >
            Islam 
            </button>
            <button value='judaism' className="btn-style" onClick={this.handleButton} >
            Judaism 
            </button>
            <button value='sikhism' className="btn-style" onClick={this.handleButton} >
            Sikhism
            </button>
            <button value='atheism'className="btn-style" onClick={this.handleButton} >
            Atheism
            </button>
          </div>

        


          <div className='Fitness'>
            <h1>Fitness </h1>
          <button value='gym' className="btn-style" onClick={this.handleButton} >
              Gym
            </button>
            <button value='callisthenics' className="btn-style" onClick={this.handleButton} >
              Callisthenics
            </button>
            <button value='cyclin' className="btn-style" onClick={this.handleButton}>
               Cyclin
            </button>
            <button value='hiking' className="btn-style" onClick={this.handleButton} >
            Hiking 
            </button>
            <button value='rockClimbing' className="btn-style" onClick={this.handleButton}>
            Rock Climbing 
            </button>
            <button value='HIIT'className="btn-style" onClick={this.handleButton} >
            HIIT 
            </button>
            <button value='horseRiding'className="btn-style" onClick={this.handleButton} >
            Horse Riding 
            </button>
            <button value='weightLifting'className="btn-style" onClick={this.handleButton
            } >
            weightLifting 
            </button>
            <button value='yoga'className="btn-style" onClick={this.handleButton} >
            Yoga
            </button>
            <button value='dancing'className="btn-style" onClick={this.handleButton} >
            Dancing
            </button>
          </div>


            
            <div className='leisure'>
            <h1>leisure </h1>
          <button value='social' className="btn-style" onClick={this.handleButton} >
              Social
            </button>
            <button value='cognitive' className="btn-style" onClick={this.handleButton} >
              Cognitive
            </button>
            <button value='physical' className="btn-style" onClick={this.handleButton}>
               Physical
            </button>
            </div>

          <Footer />
        </div>



        
      );
    }
  }
  

  export default interest;
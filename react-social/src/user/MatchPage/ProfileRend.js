import axios from 'axios';
import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import Footer from '../../common/Footer';
import { Link, NavLink } from 'react-router-dom';
import ReactPlayer from 'react-player'

import './ProfileRend.css'
 function ProfileRend(userObj){
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);


 let name =userObj.userObj[0];
 let email = userObj.userObj[1]
 let id = userObj.userObj[2];


 
 console.log(userObj);
 console.log(name);
 console.log(email);
 console.log(id);


 useEffect(() =>  {
  

  axios.get('http://localhost:8080/returnLeisure',{
    params:{
      email: email
    }
   
  })
  .then( (res) => {
    setdata(res.data);
    console.log(res.data);
  //  console.log(res.data['1']['name']);
   
  })

  axios.get('http://localhost:8080/returnInterest',{
    params:{
      email: email
    }
   
  })
  .then( (res) => {
    setdata1(res.data);
    console.log(res.data);
  
  })

  axios.get('http://localhost:8080/returnFitness',{
    params:{
      email:email
    }
   
  })
  .then( (res) => {
    setdata2(res.data);
    console.log(res.data);
  
  })



}, [])


let leisureArray=[];
let leisureArray2=[];

if (data!=0){
  
for (const element of Object.entries(data)){
   console.log(Object.values(element))
  
console.log(element)
if (element[0] !== "email") {

  leisureArray.push(Object.values(element));
}
}
console.log(leisureArray)

for (const e of leisureArray.values()){
  if(e[1]==true){
    leisureArray2.push(e[0])
  }
}
}



let InterestArray=[];
let InterestArray2=[];
if (data!=0){
  
  for (const element of Object.entries(data1)){
     console.log(Object.values(element))
    
  console.log(element)
  if (element[0] !== "email") {
  
    InterestArray.push(Object.values(element));
  }
  }
  console.log(InterestArray)
  
  for (const e of InterestArray.values()){
    if(e[1]==true){
      InterestArray2.push(e[0])
    }
  }
  }

  let FitnessArray=[];
  let FitnessArray2=[];
  if (data!=0){
    
    for (const element of Object.entries(data2)){
       console.log(Object.values(element))
      
    console.log(element)
    if (element[0] !== "name") {
    
      FitnessArray.push(Object.values(element));
    }
    }
    console.log(FitnessArray)
    
    for (const e of FitnessArray.values()){
      if(e[1]==true){
        FitnessArray2.push(e[0])
      }
    }
    }

return (
        
  <div >
    <div className="profile">
    
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
              <div class="profileCoverImg">
      {/* <div class="cover-photo">
        <div > */}
             <img class="profileCoverImg" src={"https://icebreakeraws.s3.amazonaws.com/IceBreakerCoverPhotos/" +id + "cvrphoto"}/>
        </div>
           
      {/* </div> */}

      <div className="">
      {/* <div>        
        <div className='parent'>
          <div class="image">  */}
                    <div>
                      
                    <img  class="profileUserImg" src={"https://icebreakeraws.s3.amazonaws.com/IceBreakerPhotos/" + id + "Photo"}/>
                   
          </div>
          {/* <p className='child'> {name}</p>    */}
        </div>
      </div>
      <div className="profileInfo">
                <h2 className="profileInfoName">
                  {' '}
                  {name}
                </h2>
              </div>
            </div>
          
      {/* <div className="video"> */}
      <p className="profile-video">My Introduction Video</p>
            <div className="profile-video">
        <div>
          <ReactPlayer width='480px' height='240px' controls url={"https://icebreakeraws.s3.amazonaws.com/IceBreakerVideos/"+ id+ "Video"}/>
        </div>  
              
      </div>
           <p className='P'>About Me</p>
      <div className='hobbies'>
        {

        leisureArray2.map((leisure )=>(
          <div> {leisure} </div>
        ))

        }

        {
        InterestArray2.map((leisure )=>(
          <div> {leisure} </div>
        ))

        }
        {
        FitnessArray2.map((leisure )=>(
          <div> {leisure} </div>
        ))

        }

           </div>
         
        
 {/* <Footer /> */}



            <div className="profileRightBottom"></div>
          </div>
        </div>
</div>      
);

}
export default  ProfileRend;
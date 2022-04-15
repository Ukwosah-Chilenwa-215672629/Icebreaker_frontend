import React, { Component, useState } from 'react';
import './matchPage.css';
import Footer from '../../common/Footer';
import PageRend from './PageRend';

import axios from 'axios';

import { useEffect } from 'react';



function matchPage(props, data2){
 console.log(props);
 console.log(data2)
  const [data, setdata] = useState([]);
  const [accepted, setAccepted] = useState(false);
  let [id1, setId1] = useState(props.currentUser.id);
  let [id2, setId2] = useState(0);
  console.log(id1)

 useEffect(() =>  {
    
      axios.get('http://localhost:8080/user/good/findmatches',{
        params:{
           id: id1
        }
       
      })
      .then( (res) => {
        setdata(res.data);
        console.log(res.data);
  
      })
  
  
    
  }, [])

  const selectUser2 = (userObj) => {
    setId2(Object.values(userObj)[2])
   console.log(userObj)
  }
  
  console.log(data)
  let newArray=[];
  if (data!=0){
      const num_matches = Object.keys(data).length;
      

for (const element of Object.entries(data)){
    
    console.log(element['1'])
    let needed_data ={
        name: element['1']["name"],
        email: element['1']["email"],
        id: element['1']["id"],
        profilepicture: element['1']["imageUrl"]
    }

    newArray.push(needed_data);
}

}
console.log(newArray)
const rend = ()=>{
return newArray.map((obj, index) => (

<div onClick={() => selectUser2(obj) }>
<PageRend  userObj={Object.values(obj)}  onChangeAccepted={setAccepted} Id1={id1} Id2={id2} accepted = { accepted} data = {setdata}></PageRend>
{/* <ProfileRend  userObj={obj}   ></ProfileRend> */}
 
</div>
  

) )
}
return (

  <div >
    {rend()}  
      <Footer /> 
  </div>
     
        
  
    
     
        );
      }
    
    
  
    export default matchPage;

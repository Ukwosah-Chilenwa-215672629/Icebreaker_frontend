import axios from 'axios';
import React, { useCallback, useState } from 'react'
import './PageRend.css'
import { Link, NavLink } from 'react-router-dom';
import ProfileRend from './ProfileRend';
import Chat from '../Chat/Chat';
import matchPage from './matchPage';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default  function PageRend({userObj, onChangeAccepted, Id1, Id2}){
    let article;
    const [accepted, setAccepted] = useState(false);
    const [data, setdata] = useState([]);
   
    //console.log(accepted)
    console.log(Id1)
    console.log(Id2)
const handleButton =   (event) =>{
    event.preventDefault();
    const buttonValue = event.target.value;
  
    if (buttonValue === "accept") {
        
          setAccepted(true);

    }
    else if (buttonValue === "deny") {
         setAccepted(false);
    }

    
}

const handleNext = (e)=>{
    e.preventDefault()
    axios.get('http://localhost:8080/user/good/findmatches',{
        params:{
           id: Id1
        }
       
      } )
      
      .then( (res) => {
          console.log(res.data)
        setdata(res.data);
        
        if(res.status === 200){
			
          console.log(res);
          window.location.href = "http://localhost:3000/matchPage";
        }
  
      })
      
      
    }

    


article = {
    "accepted": accepted,
    "id1": Id1,
    "id2": Id2
   
}
axios.post('http://localhost:8080/user/updateMatch', article)
    .then(console.log(Response.data))
    .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
    }); 
console.log(article)


  
    console.log(userObj);
    //console.log(userObj);
    let name = Object.values(userObj)[0];
    let profileImageURL = Object.values(userObj)[3];
    let id = Object.values(userObj)[2]
    
    return(
      <div >
        <div>
            <ProfileRend userObj={userObj}></ProfileRend>
        </div>
           
             
           
            <div className='nxt-style'>

        <div> <button value='accept' className="btn-style"  onClick={handleButton}><CheckIcon/> </button></div>
        <div> <button value= 'deny' className="btn-style"  onClick={handleButton}><ClearIcon/> </button></div>
        <div> <button className="btn-style"  onClick={ handleNext }>
                     {console.log(data)}
<matchPage data2 = {data}></matchPage>
<ArrowForwardIosIcon/>
 
</button> </div>

            
           </div>
            
        </div>
        )
}

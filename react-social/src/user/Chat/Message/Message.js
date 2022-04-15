import React from 'react'
import './Message.css'
import {format} from "timeago.js"
import moment from 'moment'
import dateFormat from 'dateformat';



export default function Message({user, msg, messenger, receiver, createdAt}){
    /*
    console.log(createdAt);

    console.log(user);
    console.log(msg);
    console.log(messenger);
    console.log(receiver);
*/


    const d = new Date(createdAt)
    //console.log(d.toLocaleString());
    var today = new Date()
    var dt = new Date('2021-07-24T20:37:26.007' + 'Z');


    const today_formated = dateFormat(today, "dddd, mmmm dS, yyyy");
    const createdAt_formated = dateFormat(d, "dddd, mmmm dS, yyyy");

    
    var timestamp;

    


    if (today_formated === createdAt_formated ){

        timestamp = format(createdAt);
    }
    else{
        timestamp = dateFormat(d, "dddd, mmmm dS, yyyy h:MM TT");
    }
  
   
    //console.log(dateFormat(d, "dddd, mmmm dS, yyyy h:MM TT"))
    //console.log(d)
    let date = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear()
    let hours = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    
    let time = hours+":"+min+":"+sec;
    
    
   time= moment(time, 'HH:mm:ss').format('h:mm:ss A');
   //let fullDate = `${day}.${month}.${year}.`;
   /*
   console.log(time)
    
    console.log(month)
    console.log(date)
    console.log(year)


    console.log(user);
    console.log(msg);
    console.log(messenger);
    console.log(receiver);
    */
    
    const own = (user.name == messenger.name) && (user.id === parseInt(messenger.id));
    //console.log(own);
    
    return(

        (!own)?
            <li class="you">
				<div class="entete">
					
					<h2>{messenger.name}</h2>
                    {" "}
					<h3>{timestamp}</h3>
				</div>
				
				<div class="message">
					{msg}
				</div>
			</li>
            :
            <li class="me">
				<div class="entete">
					<h3></h3>
					<h2>{messenger.name}</h2>
					
				</div>
				
				<div class="message">
					{msg}
				</div>
			</li>



        
        
        
        

    
    )

        {/*

        <div className={own ? "message own": "message"}>
            <div className="messageTop">

         

            {
                !own ? <img className="messageImg" src={"https://icebreakeraws.s3.amazonaws.com/IceBreakerPhotos/" + messenger.id + "Photo"}alt="Profile Picture"/> :
                <img className="messageImg" src={"https://icebreakeraws.s3.amazonaws.com/IceBreakerPhotos/" + user.id + "Photo"} alt="Profile Picture"></img>
            }
            
           
            <p className="messageText">{msg}</p>
            </div>
            {
                !own ? <div className="messageBottom">{format(createdAt)}</div> :
                <div className="messageBottom"></div>
            }
            
        </div>
        */}
        
}
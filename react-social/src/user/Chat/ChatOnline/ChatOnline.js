import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import "./ChatOnline.css"
export default function ChatOnline({onlineUsers, currentId, setCurrentChat }){
    console.log(onlineUsers)
    console.log(currentId)
    console.log(setCurrentChat)

    //console.log(check)
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])
    const matches = { id: currentId}
    const SERVER = "http://localhost:5000";

  

        
    

    useEffect(() => {

   


        getFriends();

    
          
    }, [currentId]);


    const getFriends = async ()=>{


        try {
            const {data} = await axios('http://localhost:8080/user/me/getAvailableChats', { params: matches })

             
      
             let newArray=[];
             for (const element of Object.entries(data)){
                  
                  console.log(element)
                  newArray.push(element[1]);
      
            
             }
             setFriends(...friends, newArray);
            

             return data;
        } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
          console.log(`error: `, error)
        }
        
  
        //
    }
    console.log(friends)

    
    useEffect(() =>{
        //setOnlineFriends(friends.filter((f)=> onlineUsers.includes(f.id)))

        /*
        friends.filter(function(element, index) { 
            console.log(element.id) 
            console.log("YESSIR")
    })*/
    for(const friend of friends){

        for (const onlineUser of onlineUsers){

            if(friend.id === onlineUser.userId && !onlineFriends.includes(friend)){
                setOnlineFriends([...onlineFriends, friend]);
                //setMessages([...messages, newMessage]);
            }
        }
        
        
    }

    


    }, [friends, onlineUsers]);
    
    console.log(friends)
    console.log(onlineUsers)
    console.log(onlineFriends)

  
    const handleClick = async (user) =>{
        try{
            //const res = await axios.get(SERVER+"/conversations/find/"+currentId+"/"+user.id)
            //console.log(res.data)
            //setCurrentChat(res.data)
            //setCurrentChat()
        }
        catch(err){
            console.log(err);
        }
    }


    

    return(


      

        <div className="chatOnline">
        
  
        {onlineFriends.map((onlinefriend, index) => (
                
                <div className="chatOnlineFriend" onClick={()=>handleClick(onlinefriend)}>
                    <div className="chatOnlineImgContainer">
                    <img className="conversationImg" src={"https://icebreakeraws.s3.amazonaws.com/IceBreakerPhotos/" + onlinefriend.id + "Photo"} alt="Profile Picture">
                </img>
                        <div className="chatOnlineBadge"></div>
                     </div>
                    <span className="chatOnlineName"> {onlinefriend.name} </span>
                </div>
               
              
                ))}
       
        </div>
        )
}
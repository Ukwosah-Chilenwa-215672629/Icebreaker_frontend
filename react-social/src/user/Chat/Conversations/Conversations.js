import React from 'react'
import './Conversations.css'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Conversation({roomNum, userObj, lastMessage, onlineUsers, currentId}){

  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const [lastMsg, setLastMsg] = useState("");
 
  console.log(onlineUsers)
    console.log(currentId)

    const matches = { id: currentId}
    const SERVER = "http://localhost:5000";

    console.log(roomNum);


    const retrievelastMsg =  async (conversationID) => {
      try {
          console.log
    
    
          
          const myArray = conversationID.split("QUEUE");
          
          let conversationID2 = myArray[1]+"QUEUE"+myArray[0];
    
          console.log(conversationID2)
          
        console.log(conversationID);
        const res = await axios.get(SERVER+"/messages/find/getLastMessages/"+conversationID+"/"+conversationID2);
    
        console.log(res.data.messageBody);
        setLastMsg(res.data.messageBody);
  

       
        
        console.log(lastMsg);
    
        
         
        console.log(res.data);
        //return res.data.messageBody;
      } catch (error) {
    // enter your logic for when there is an error (ex. error toast)
        console.log(`error: `, error)
      }
    }


    /*
    export default function Conversation({convo, currentUser}){
    console.log(convo)

    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
    useEffect(() => {
      const friendId = conversation.members.find((m) => m !== currentUser._id);
  
      const getUser = async () => {
        try {
          const res = await axios("/users?userId=" + friendId);
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }, [currentUser, conversation]);
  
    return (
      <div className="conversation">
        <img
          className="conversationImg"
          src={
            user?.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <span className="conversationName">{user?.username}</span>
      </div>
    );

*/
    console.log(lastMessage);
    console.log(lastMsg);
 
   
    let name = userObj.name;
    let profileImageURL = userObj.imageUrl;
    let UserId = userObj.id;
    console.log(userObj);

    console.log(name);
    console.log(profileImageURL);
    console.log(UserId);

    
    useEffect(() => {

   


      getFriends();
      retrievelastMsg(roomNum);


  
        
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
   

    const otherProfileImg = async () => {
        

        if(document.getElementById('img')){
            document.getElementById('img').src = require("../../../img/person-icon.png")
        }

    }
   
    let isOnline=false;

    for (const onlineFriend of onlineFriends){

      console.log(onlineFriend.id)
      console.log(userObj.id);
      if(onlineFriend.id == userObj.id && onlineFriend.name == userObj.name){
        isOnline=true;
        break;
      }
  }

    console.log(isOnline);
    
    return(




        <aside className="conversation">
          
        



            <li>
            <img id='img' className="conversationImg" src={"https://icebreakeraws.s3.amazonaws.com/IceBreakerPhotos/" + UserId + "Photo"}
                    alt="Profile Picture" onerror={otherProfileImg()}>
            </img>

            <div>
              <h2>{name}</h2>

              {lastMsg.length>32?
                  <div> {lastMsg.substring(0,32)}...
                  </div>
              :
              <div> {lastMsg}
              </div>
              }
          
            {
                  isOnline?

                  <h3>
               
                <span  class="status green"></span>
                online
              </h3>
              :
              <h3>
               
                <span class="status orange"></span>
                offline
              </h3>
              }
              
            </div>
          </li>
          

    </aside>






        )

        

        

}
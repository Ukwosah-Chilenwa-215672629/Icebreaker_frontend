
import React, { useEffect, useRef, useState, useCallback } from "react";
import './Chat.css'
import ChatOnline from './ChatOnline/ChatOnline';
import Conversations from './Conversations/Conversations';
import Message from './Message/Message';
import Circle from './ChatAnimation/Skeleton';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import axios from 'axios';
import io from 'socket.io-client';
import { messageObj } from './Message/MessageSchema';
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/logo.png'
import Popup from './Popup/Popup';




function Chat(props){
  
  const matches = { id: props.currentUser.id }
  const SERVER = "http://localhost:5000";
  const MATCHES_ENDPOINT = "http://localhost:8080/user/me/findMatches";
  const [loading, setLoading ] = useState(true);
  const [count, setCount ] = useState(0);
  const [queue_rooms, setQueue_rooms] = useState([]);
  const [queue_rooms_Filtered, setQueue_rooms_Filtered] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const scrollRef2 = useRef();
  const searchInput = React.useRef(null)
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [conversations, setConversations] = useState([]);
  const [query, setQuery] = useState("");

  const [lastMsgArray, setlastMsgArray] = useState([]);


  const [buttonPopup, setButtonPopup] = useState(false);
  //const [timedPopup, setTimedPopup] = useState(false);

  const [scrap, setScrap] = useState('scrap hahahaha');

  const user = props.currentUser

  let newArray=[];

  const socketRef = useRef();
  
  let myuuid = uuidv4();

/*
  useEffect(()=>{
    const getConversations = async ()=>{
      try{

      
      const res = await axios.get(SERVER+"/conversations/"+user.id)
      setConversations(res.data)
      }
      catch(err){
        console.log(err);
      }
    }
    getConversations()
  }, [user.id])

   
*/
  
  const [message, setMessage ] = useState("")



  
 
  useEffect(()=>{
    console.log("CurrentChat changed")
   
    const getMessages = async ()=>{
      if(currentChat){
       try{
         
         
         const res = await axios.get(SERVER+"/messages/"+currentChat[0]);
         
         setMessages(res.data);
        }
        
        catch (err){
         console.log(err);
        }
      }
     
    }
    
     getMessages();
   
    
  }, [currentChat])



 
  
  

  useEffect(()=>{
    
    socketRef.current = io.connect(SERVER);
    console.log(socketRef.current);
    

     


  }, [] )

  

  useEffect(()=>{

    
    socketRef.current.emit("addUser", user.id, user.name);
    socketRef.current.on("getUsers", users=>{

      for(const user1 of users){
        console.log(user1.userId);
        console.log(user1.name)
        
        console.log(user.id);
        console.log(user.name);

        if(user1.userId !== user.id && user1.name !== user.name){
          setOnlineUsers([...onlineUsers, user1]);
        }
        
      }
    
      console.log(users);
      
    })
    /*
    if(currentChat){
      socketRef.current.emit('join', {name: props.currentUser.name, userId: props.currentUser.id, room: currentChat[0]}, ()=>{
          
      })
     }
    */
     


  }, [user, SERVER] )


  useEffect(() => {

   


    axiosPostCall().then(data => {
        
      
        setTimeout(() => {
            if (data){
            
                setLoading(false)
            }
        }, 2500);

       
        console.log(loading)
       
      })
      .catch(e => console.log(e));

 
        getQueueRooms();

        
       
      


      
}, []);


const axiosPostCall = async () => {
  try {
    /*
      const { data } = await axios.post(MATCHES_ENDPOINT, matches )
      // enter you logic when the fetch is successful
         
       console.log(`data: `, data)
       setCount(parseInt(data.substring(0,data.indexOf("M"))))
       return data;
      */
        
       const {data} = await axios('http://localhost:8080/user/me/getAvailableChats', { params: matches })
       // enter you logic when the fetch is successful
      let count = Object.keys(data).length;
     
      return count;
  } catch (error) {
// enter your logic for when there is an error (ex. error toast)
    console.log(`error: `, error)
  }
}


 const getQueueRooms = async () => {


  try {
      const {data} = await axios('http://localhost:8080/user/me/getAvailableChats', { params: matches })
      // enter you logic when the fetch is successful




         
       //console.log(Object.keys(data)) // gives the queue number
    
       //console.log(Object.values(data))

       //console.log(Object.entries(data))

       //console.log(data);
       

       
       for (const element of Object.entries(data)){
            //console.log("Line 180");

           
           // newArray.push(element);

            //retrievelastMsg(element[0]);


              
              newArray.push(element);
              //retrievelastMsg(element[0]);
          

           //console.log( element[0]);
          // console.log( element[1]);
           //console.log( element[2]);
       }

       setQueue_rooms(...queue_rooms, newArray)

       setQueue_rooms_Filtered(...queue_rooms, newArray);

       setConversations(...queue_rooms, newArray);

      //queue_rooms.push(Object.entries(data))
     
      
       
       return data;
  } catch (error) {
// enter your logic for when there is an error (ex. error toast)
    console.log(`error: `, error)
  }
  
  //const response = await axios('http://localhost:8080/user/me/getAvailableChats', { params: matches })
  //setQueue_rooms([...queue_rooms, response.data])
  //console.log(response.data)

  
 };

/*
 const retrievelastMsg =  async (conversationID) => {
  try {
      console.log


      
      const myArray = conversationID.split("QUEUE");
      
      let conversationID2 = myArray[1]+"QUEUE"+myArray[0];

      console.log(conversationID2)
      
    console.log(conversationID);
    const res = await axios.get(SERVER+"/messages/find/getLastMessages/"+conversationID+"/"+conversationID2);

    console.log(res.data.messageBody);

    setlastMsgArray([...lastMsgArray, res.data.messageBody]);
     
    console.log(res.data);
    //return res.data.messageBody;
  } catch (error) {
// enter your logic for when there is an error (ex. error toast)
    console.log(`error: `, error)
  }
}

*/

useEffect(()=>{

  if(queue_rooms && queue_rooms.length>=1){
    
   // console.log(props.currentUser.id)
    //console.log(queue_rooms[0])

    /*

    for(const rooms of queue_rooms){
      console.log(rooms);
      const lastMessage = retrievelastMsg(rooms[0]).then(result => {
        rooms.push(result);
        console.log(result);
       
      })
      console.log(lastMessage);
            
    
    }
    
*/
 

    
          
           
         

    setCurrentChat(queue_rooms[0]);






  }
  
 
  
}, [queue_rooms])





/*
const privateMessage = useCallback((
  {senderName,
  senderId,
   
  text})=>{
  
    const newMessage ={
      
      senderName,
      senderId,
      receiverId,
      receiverName,
      text,
    };

    setMessages([...messages, newMessage]);

}, [messages, setMessages]);


useEffect(()=>{
  socketRef.current.on("sendMessage",(message)=>privateMessage(message))
}, [privateMessage]);
*/

console.log(queue_rooms)

useEffect(()=>{
  socketRef.current.on("getMessage",({author, receiver, messageBody, messageId, conversationId, createdAt})=>{
    /*
    console.log(author);
    
    console.log(receiver);
    console.log("265")
    console.log(messageBody);
    console.log(messageId);
    

  
      console.log(conversationId);
   */
    
    const newMessage ={
      
      author: author,
      receiver: receiver,
      messageBody: messageBody,
      messageId:messageId,
      conversationId: conversationId,
      createdAt: createdAt
    };

    console.log(newMessage);
    console.log("line 282");
    //setMessage(newMessage);
    setMessages([...messages, newMessage]);
  
    
   



  })
}, [messages]);


  
	const onTextChange = (e) => {
    let myuuid4 = uuidv4();

    let msgreceiver = {
      name: currentChat[1]['name'],
      id: currentChat[1]['id'],
    }

    let sender ={
      name:user.name,
      id:user.id,
    }

   
    
		setMessage({ ...message, [e.target.name]: e.target.value, messageId: myuuid4, receiver: msgreceiver, conversationId: currentChat[0], author:sender })
    //console.log(message);
   // console.log(currentChat);
    
	}


  const getScrap = (e) => {
    
    axios.get('http://localhost:8080/user/me/getSport').then((res) => {
      setScrap(res.data);
    });
    setButtonPopup(true);
  };

  useEffect(()=>{

    if(document.querySelector("main header")){
      if(buttonPopup){
        document.querySelector("main header").style.height = '200px';
      }
      else{
        document.querySelector("main header").style.height = '120px';
      }
    }
   
  
  },[buttonPopup])



  const onSearchTextChange = (event) => {
    
    setQuery(event.target.value);
    console.log(query);
    console.log(event.target.value);

  
    
    //setQueue_rooms([]);
    //console.log(conversations);
    
    conversations.filter(room =>{
      console.log(room);
      if (event.target.value === '') {
        setQueue_rooms_Filtered(queue_rooms);
        return null;
      } else if (room[1].name.toLowerCase().includes(event.target.value.toLowerCase())) {
        console.log(room);
        setQueue_rooms_Filtered([room]);
        //renderConversations()
        return room;
      }
    })

    console.log(queue_rooms_Filtered);
    
    
	}

  if (document.activeElement === searchInput.current) {
    // do something
    console.log("SEARCH BAR ACTIVE");
  }

  const selectCurrentChat = (room) =>{

    
    
    setCurrentChat(room);

    //setMessages([]);
    
    //socketRef.current.emit("user messages", room[0]);

  }


  const selectCurrentChatFiltered = (room) =>{

   

    setCurrentChat(room);

    setMessages([]);

    const getMessages = async ()=>{
      if(currentChat){
       try{
         
         
         const res = await axios.get(SERVER+"/messages/"+room[0]);
         
         setMessages(res.data);
        }
        
        catch (err){
         console.log(err);
        }
      }
     
    }
    
     getMessages();
    

    
    //socketRef.current.emit("user messages", room[0]);

  }

 

	const onMessageSubmit = async (e) => {

    e.preventDefault();

    console.log("Line 293");
    //console.log(message);

    const { author, messageBody, messageId, receiver, conversationId } = message

    const newMessage = {
      author: author,
      receiver: receiver,
    messageBody: messageBody,
    messageId:messageId,
    conversationId: conversationId,


    
  }

  //console.log(newMessage);

  

    try{
      const res = await axios.post(SERVER+"/messages", newMessage);
      console.log(res);
      //setMessages([...messages, newMessage]);
      setMessages([...messages, res.data]);

      

      socketRef.current.emit("sendMessage", res.data)
      //setMessage({author, messageBody: "",messageId:""});
      setMessage({messageBody: "",messageId:""});

    }catch(err){
      console.log(err);
    }
    
    
   /* 

    socketRef.current.emit("sendMessage", {
      author: author,
      receiver: {
        name: currentChat[1]['name'],
        id: currentChat[1]['id'],
      },
      text: messageBody,
      textId: messageId,
      conversationId: currentChat[0],
      

    })

    */

    

    


    
	
    
    
    
    //setState({ author, messageBody: "", messageId: "" })
    
  }

  
  //console.log(currentChat);
  //console.log(messages);


  const renderConversations = () =>{
    
    
    /*
		return queue_rooms.map(({ otherUser }, index) => (
          
      <Conversations otherUser={otherUser}></Conversations>
		))
    */
   /*conversations.map((convo)=>(
      <div onClick={()=>selectCurrentChat(convo, props.currentUser)}>
          <Conversations  convo={convo}  ></Conversations>
      </div>
      
      ))
    */

     
        return queue_rooms_Filtered.map((room, index) => (
     
          //<div ref={scrollRef2}>
          <div>
          <div onClick={()=>selectCurrentChat(room)}>
              {console.log(room)}
              <Conversations roomNum={room[0]} userObj={room[1]} lastMessage={lastMsgArray[index]} onlineUsers={onlineUsers} currentId={user.id} ></Conversations>
          </div>
          </div>
          
        ))
      
 
    
    

  }

	const renderChat = () => {
    console.log(messages);
		return messages.map(({ author, receiver, messageBody, messageId, conversationId, createdAt }, index) => (
          <div ref={scrollRef}>
            {/*console.log(author)*/}
            {/*console.log(receiver)*/}
            {/*console.log(createdAt)*/}

          
        <Message user={props.currentUser} msg={messageBody} messenger={author} receiver={receiver} createdAt={createdAt}></Message>
        </div>
		))
	}

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behaviour: "smooth"})
    }
  
  },[messages])

  useEffect(()=>{
    if(scrollRef2.current){
      scrollRef2.current.scrollIntoView({behaviour: "smooth"})
    }
  
  },[queue_rooms])

  //if (loading) return <Circle></Circle>
  //else
	return (









			
<div id="container">
	<aside>
		<header>
			<input id="searchConvo" type="text" placeholder="SEARCH USER" ref={searchInput} onChange={event => onSearchTextChange(event)}/>
  
      
      
      {
        //event.target.value

        /*
        queue_rooms.filter(room =>{
          if (query === '') {
            return null;
          } else if (room[1].name.toLowerCase().includes(query.toLowerCase())) {
            return room;
          }
        }).map((room, index) => (
          <div ref={scrollRef2}>
          <div className="box" key={index} onClick={()=>selectCurrentChatFiltered(room)}>
            {console.log(room)}
            <Conversations roomNum={room[0]} userObj={room[1]} lastMessage={lastMsgArray[index]} onlineUsers={onlineUsers} currentId={user.id} ></Conversations>
        </div>
        </div>
        ))
        */
        
        /*
        Data.filter(post => {
          if (query === '') {
            return null;
          } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
            return post;
          }
        }).map((post, index) => (
          <div className="box" key={index}>
            <p>{post.title}</p>
            
          </div>
        ))
        */
    }
		</header>
		<ul>
        {console.log(lastMsgArray)}
        {renderConversations()}
		</ul>
	</aside>
	<main>
  {(currentChat)?
		<header style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      
    }}>
      
    <div className="iceBreakerDiv">
      <div className="leftDiv">
        <img id="headerImg" src={"https://icebreakeraws.s3.amazonaws.com/IceBreakerPhotos/" + currentChat[1]['id']+ "Photo"} alt=""/>
      </div>
		
      
      
      <div className="centreDiv">
      <p>Chat with {currentChat[1]['name']}    </p>
    </div>

    <div className="rightDiv">
      <img className="Chatlogo" onClick={getScrap} src={logo} alt=""/>
      </div>
   


    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
    
      <p>{scrap}</p>
    </Popup>	

    </div>	
		</header>
    :
    <header>
        	
		</header>
    }
		<ul id="chat">
		
        {renderChat()}
		</ul>
		<footer>
      
			<textarea name="messageBody"
						onChange={(e) => onTextChange(e)}
						value={message.messageBody}
						 className="chatMessageInput"  placeholder="Type your message"></textarea>
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt=""/>
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt=""/>
      
			<a id="sendButton" onClick={onMessageSubmit}><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></a>
		</footer>
	</main>
</div>
                
			
	
	)
    

  
}




export default Chat;

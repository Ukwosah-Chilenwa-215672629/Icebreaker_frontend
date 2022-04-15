const amqp = require('amqp');
const rabbitMq = amqp.createConnection({ host: 'rabbitmq-host.com' });
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const MQService  = require('./MQService')
const messageStorage = require('./messageStorage')
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");

const PORT = process.env.PORT || 5000;

const ConversationRoute = require("./routes/conversations");
const MessageRoute = require("./routes/messages");
const cors = require('cors');


const app = express();
app.use(cors());
//const app = express.createServer();








/*
const connectToMongoDB = async () => {
  await mongo().then(async (mongoose)=>{
    try{
        console.log("Connected to MongoDB");

        const user = {
          email: "test@email.com",
          username: "joe",
          password: "Password1!"
        }

        await new userSchema(user).save()
    }
    finally{
        mongoose.connection.close();
    }
  })
}

connectToMongoDB();

*/

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,  }, ()=>{
  console.log("connected to mongoDB");
})


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/conversations", ConversationRoute)
app.use("/messages", MessageRoute)

app.get("/", (req,res)=>{
  res.send("Welcome to homepage");
});

/*
app.get("/conversations", async (req,res)=>{
 
  console.log(req.body.senderId);

  const members = [req.body.senderId, req.body.receiverId];
  
  try {
      
      const user = {
          email: "test@email.com",
          username: "joe",
          password: "Password1!"
        }
      console.log('before save');
      let savedConversations  = await new userSchema(user).save()//when fail its goes to catch
      console.log(savedConversations); //when success it print.

      console.log('after save');
      res.status(200).json(savedConversations)
    } catch (err) {
      console.log('err' + err);
      res.status(500).send(err);
    }

 //console.log(req.body);
})

*/

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});


let users = [];


const addUser = (socketId, name, userId)=>{
  
  
  const existingUser = users.find((user)=>user.name === name && user.socketId === socketId && user.userId == userId);


  if(existingUser){
    return {error: 'User Exists!!'};
  }

  console.log("type of userMessages " +typeof userMessages);

  const user = {socketId, name, userId};
  console.log(user);
  console.log("user.socketID: "+user.socketId);
  users.push(user);
  console.log("ALL USER");
  for(const user of users){
    console.log(user);
    console.log(user.socketId);
  }
  

  return {user};
}

const removeUser = (socketId)=>{
  users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId)=>{
  
    console.log("USERID FROM getuser "+userId);
    console.log(typeof(userId));
    for(const user of users){
      console.log(user.userId);
      console.log(typeof(user.userId));
      if(user.userId == userId){
        console.log("FOUND USER");
        return user;
      }
    }
    
  
    return users.find((user)=>user.userId == userId);
}




io.on('connection', (socket) =>{

  
  

  console.log("a user connected");

  /*
  socket.on('join', ({name, userId, room}, callback) =>{
    const {error, user} = addUser({SocketId: socket.id, name, userId, room});
    
    if (error) return callback(error);

  

  
})
*/



socket.on("addUser", (userId, userName)=>{
  console.log("USER ID: "+ userId);
  console.log("SOCKET ID: "+ socket.id);
  console.log("userName: "+ userName);
  addUser(socket.id, userName, userId);
  io.emit("getUsers", users);
})

  


 


  //send messages

  
  socket.on("sendMessage",({author, receiver, messageBody, messageId, conversationId, createdAt})=>{

    
    
    console.log(author);
    console.log(receiver);
    console.log(messageBody);
    console.log(messageId);
    console.log(conversationId);
    console.log(createdAt);
    console.log("RECEIVER ID: "+receiver.id);

    //console.log("all users: "+users);

    const user = getUser(receiver.id);

    console.log("USER RECEIVING MESSAGE:"+user);


    console.log(author);

    const message ={
      author: author,
      receiver: receiver,
      messageBody:messageBody,
      messageId: messageId,
      conversationId: conversationId,
      createdAt: createdAt,
     
      
    }
    
    //io.emit("sendMessage", message );
    //console.log("USER.SOCKETID "+user.socketId);

    try{
      console.log(user.socketId);
      io.to(user.socketId).emit("getMessage", message)
      console.log(message);
      // was getMessage before
    }
  
   catch(e){
         /*
        
        rabbitMq.on('ready', function () {
          io.sockets.on('connection', function (socket) {
            var queue = rabbitMq.queue('my-queue');
        
            queue.bind('#'); // all messages
        
            queue.subscribe(function (message) {
                console.log(message);
                console.log(queue);
              //socket.emit('message', message);
            });
          });
        });
        */
        
       
        
      MQService.createConnection(message.conversationId, message);
   }
      
      
  })









  socket.on("disconnect", ()=>{

    console.log("a user disconnected")
    removeUser(socket.id);
  })
  
})


server.listen(PORT, ()=> 
console.log(`Server has started on port ${PORT}`)
);

/*

rabbitMq.on('ready', function () {
    io.sockets.on('connection', function (socket) {
      var queue = rabbitMq.queue('my-queue');
  
      queue.bind('#'); // all messages
  
      queue.subscribe(function (message) {
          console.log(message);
          console.log(queue);
        socket.emit('message', message);
      });
    });
  });

*/

/*
const getSocketByUserId = (userId) =>{
  let socket = '';
  for(let i = 0; i<clientSocketIds.length; i++) {
      if(clientSocketIds[i].userId == userId) {
          socket = clientSocketIds[i].socket;
          break;
      }
  }
  return socket;
}




io.on("connection", (socket) => {
    

    socket.on('loggedin', function(user) {
      
      console.log(user.user.id);
      console.log('a user is connected');
      clientSocketIds.push({socket: socket, userId:  user.id});
      
  });

    socket.on('create',  ({room, userId, withUserId}, callback) => {
      console.log(room);
      console.log("create room")
      socket.join(room);
      let withSocket = getSocketByUserId(withUserId);
      socket.broadcast.to(withSocket.id).emit("invite",{room:room})
  });

  socket.on('joinRoom', function(data) {
    console.log("JOINROOM")
    console.log(data);
    socket.join(data);
});
 

    socket.on('join', ({name, room}, callback) =>{
        console.log(name);
        console.log(room);
        let otherUser = Object.keys(room)[0];
        room_name = room[otherUser];
        
        console.log(room_name);

        
        
        socket.emit('message', {user: 'admin', text: `${name}, welcome to the room ${room_name}`  })
        socket.broadcast.to(room_name).emit('message', {user: 'admin', text: `${name}, has joined!`})
      
        //io.to(room_name).emit('roomData', { room: room_name, users: getUsersInRoom(user.room) });
        
        socket.join(room_name);
    

        callback();
    })


    socket.on('message', ({ author, messageBody, messageId, to }) =>{
       io.emit('message', { author, messageBody, messageId })
         // io.to(to).emit('message', { author, messageBody, messageId });
        MQService.publishToQueue('NewQueue', messageBody);

    });

    socket.on('disconect', () =>{
        console.log("User left!!!");
    })
  });

  

server.listen(PORT, ()=> 
console.log(`Server has started on port ${PORT}`)
);
*/







/*var app = require('http').createServer()

var io = module.exports.io = require('socket.io')(app, {cors: {origin: "*"}})

const PORT = process.env.PORT || 3700

const SocketManager = require ('./SocketManager.js')

io.on('connection', SocketManager)

app.listen(PORT, ()=>{
    console.log(`Connected to port: ${PORT}`)
})
*/
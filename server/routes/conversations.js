const router = require("express").Router();
const Conversation = require("../models/Conversation");
//const userSchema = require("../models/user-schema")

// new conv


router.post("/", async (req,res)=>{
    
    
    
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    console.log(newConversation);
    
    try{
        const savedConversation = await newConversation.save();
        console.log(savedConversation);
        res.status(200).json(savedConversation);
        
    }
    catch(err){
        res.status(500).json(err);
    }
    
   

   /* 
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
*/
   //console.log(req.body);
})




// get conv of a user

router.get("/:userId", async(req,res)=>{
    
    const userId = parseInt(req.params.userId)
    try{
        const conversation = await Conversation.find({
            members: { $in: [userId]},
        })
        res.status(200).json(conversation);
    }
    catch(err){
        res.status(500).json(err);
    }
    
})

// get conversation of two users

router.get("/find/:firstUserId/:secondUserId", async(req,res)=>{
    const userId1 = parseInt(req.params.firstUserId)
    const userId2 = parseInt(req.params.secondUserId)
    try{
        const conversation = await Conversation.findOne({
            members: { $all: [userId1, userId2]},
        })
        res.status(200).json(conversation);
    }
    catch(err){
        res.status(500).json(err);
    }
    
})


module.exports = router;
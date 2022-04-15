const messages = [];

const saveMessage = (message)=>{
    messages.push(message);
}
    

const findMessagesForUser = (userId) =>{
    return messages.filter(({author, receiverId}) => author.id == userId || receiverId == userId);
}



exports.saveMessage = saveMessage;
exports.findMessagesForUser = findMessagesForUser;

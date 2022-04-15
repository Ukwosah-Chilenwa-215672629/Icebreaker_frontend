const amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://localhost';
const axios = require('axios');
let ch = null;

exports.createConnection = (newqueue, data)=>{

amqp.connect(CONN_URL, function(err, conn){
    if (err) {
        throw err;
      }


    
    
    conn.createChannel(function(err, channel){
        if (err) {
            throw err;
          }
        ch = channel;
        
        var queue = newqueue;

        ch.assertQueue(queue, {
          durable: false
        });

        ch.sendToQueue(queue, Buffer.from(data.messageBody), {persistent: true, headers: {"author":data.author, "receiver": data.receiver}});
        console.log(`Message: ${data.messageBody} sent to ${queue}`);

        /*
        // I am consuming right away need to find solution to this.
        ch.consume(queue, function(msg){
            console.log('....');
            console.log("Message:", msg.content.toString());
                ch.ack(msg);
            
        }, {noAck: false}
        );
        */

/*
        var queue = conn.queue(queue);
        
            queue.bind('#'); // all messages
        
            queue.subscribe(function (message) {
                console.log(message);
                console.log(queue);
              //socket.emit('message', message);
            });
        
      */  
    })
})

}



  

process.on('exit', (code)=>{
    ch.close();
    console.log(`Closing rabbitmq channel`);
})


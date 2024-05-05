const express = require('express'); 
const http = require('http');
const configureExpressApp = require("./conf/serverConf");
const router = require("./router");
const dbconn = require("./dbconn");
const app = express(); 
const PORT = 3001; 
configureExpressApp(app)
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server,{
  cors:{
    orgin:["http:localhost:3000"]
  }
});

io.on('connection',(socket)=>{
  
  socket.on('join-room',(data)=>{

    socket.join(data.roomId)
  })
  socket.on('msg',(data)=>{
    socket.broadcast.to(data.roomId).emit("msg-server",data.message);
  })
})

dbconn()
.then(async(db) => {
  server.listen(PORT);
  console.log(`Server started on Port ${PORT}`);
  router(app);


}).catch((error) => console.error(`Unable to start the server`, error));


import React, { useState ,useRef,useEffect} from 'react';
import { Paper, Typography, TextField, Button, Divider, Box } from '@mui/material';
import axios from 'axios';
import {io} from 'socket.io-client';
const Conversation = ({ selectedContact ,userData}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  console.log("messages:",messages)
  const messagesEndRef = useRef(null);

  useEffect(()=>{
    setSocket(io("http://localhost:3001"));
  },[])
  useEffect(() => {
    if (socket) {
      socket.on('msg-server', (data) => {
        console.log(data);
        setMessage(data);
        setMessages(prevMessages => [...prevMessages, { sender: "other", message: data }]);
        setMessage('')
        
      });
      socket.emit('join-room', { roomId: selectedContact.id });
    }
  }, [socket]);
  

  useEffect(() => {
    if (messagesEndRef.current) {
      
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []); 
 
  useEffect(()=>{
    const getMessages = async()=>{
      await axios.get(`http://localhost:3001/get_message/${selectedContact.id}`)
      .then((res)=>{
        setMessages(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    getMessages()
  },[selectedContact])
  
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async() => {
    if (message.trim() !== '') {
      await axios.post("http://localhost:3001/send_message",{
        sender:userData,
        receiver:selectedContact.name,
        text:message
      })
      .then((res)=>{
        setMessages([...messages, { sender: userData, message }]);
        socket.emit('msg',{message,roomId:selectedContact.id});
        setMessage('');
      })
      .catch((err)=>{
        console.log(err);
      })
      
    }
  };

  const handleKeyPress = (e)=>{
    if(e.code=='Enter'){
      handleSendMessage()
    }
  }
  return (
    <Box style={{ flex: 1, padding: '20px', width:'calc(100vw - 64px)',height: 'calc(100% - 64px)' }}>
      
          <Typography variant="h5">{selectedContact.name}</Typography>
          <Divider style={{ margin: '10px 0' }} />
          <Box style={{ height: 'calc(70vh - 64px)', overflowY: 'auto' }}>
            {messages?.map((msg, index) => (
              <Box key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === userData ? 'flex-end' : 'flex-start' }}>
                
                <Typography variant="body2" style={{ marginBottom: '12px', padding: '8px', backgroundColor: msg.sender === 'me' ? '#007bff' : '#f0f0f0', borderRadius: '8px', color: msg.sender === 'me' ? 'white' : 'black' }}>
                  {msg.message}
                </Typography>
              </Box>
              
            ))}
            <Box ref={messagesEndRef}> 
              </Box>
          </Box>
          
          <Box display="flex" alignItems="center" > 
            <TextField
              value={message}
              onChange={handleMessageChange}
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              onKeyUp={handleKeyPress}
            />
            <Button onClick={handleSendMessage} padding={'5%'} variant="contained" color="primary" style={{ marginLeft: '10px' }}> {/* Add marginLeft */}
              Send
            </Button>
          </Box>
      
    </Box>
  );
};

export default Conversation;
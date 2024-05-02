import React, { useState ,useRef,useEffect} from 'react';
import { Paper, Typography, TextField, Button, Divider, Box } from '@mui/material';

const Conversation = ({ selectedContact }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);


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
  
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { sender: 'me', message }]);
      setMessage('');
    }
  };

  const handleKeyPress = (e)=>{
    if(e.code=='Enter'){
      handleSendMessage()
    }
  }
  return (
    <Box style={{ flex: 1, padding: '20px', width:'calc(100vw - 64px)',height: 'calc(100% - 64px)' }}>
      {selectedContact ? (
        <>
          <Typography variant="h5">{selectedContact.name}</Typography>
          <Divider style={{ margin: '10px 0' }} />
          <Box style={{ height: 'calc(70vh - 64px)', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <Box key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                
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
        </>
      ) : (
        <Typography variant="h5">Select a contact to start conversation</Typography>
      )}
    </Box>
  );
};

export default Conversation;

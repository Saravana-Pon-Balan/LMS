import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp';

const Chat = () => {
  const [open, setOpen] = useState(true); // Set initial state to true
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatAreaRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat area when new messages are added
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleToggleChat = () => {
    setOpen(!open);
  };

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { sender: 'user', text: input }]);
      axios.post("http://localhost:3001/chatbot", { text: input })
        .then((res) => {
          setMessages(prevMessages => [...prevMessages, { sender: 'chatbot', text: res.data }]);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      setInput('');
    }
  };

  return (
    <Box position="absolute" zIndex={1}>
      {open && (
        <Box
          position="fixed"
          bottom="0"
          right="0"
          width={{ xs: '100%', sm: 'calc(100% / 3)' }}
          bgcolor="white"
          borderRadius={4}
          overflow="hidden"
          boxShadow={2}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
            <Typography variant="h6" component="div">
              <ChatIcon fontSize="small" style={{ marginRight: '4px' }} />
              Virtual Assistant
            </Typography>
            <IconButton onClick={handleToggleChat} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box p={2} minHeight={"350px"} maxHeight="350px" overflow="scroll" ref={chatAreaRef} flexGrow={1}>
            {messages.map((message, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                {message.sender === 'user' ? (
                  <>
                    <Typography
                      variant="body1"
                      gutterBottom
                      align='right'
                      style={{ marginLeft: 'auto', backgroundColor: '#e0e0e0', padding: '8px', borderRadius: '8px', marginRight: '8px' }}
                    >
                      {message.text}
                    </Typography>
                    <PersonIcon style={{ marginLeft: '8px' }} />
                  </>
                ) : (
                  <>
                    <SmartToySharpIcon style={{ marginRight: '8px' }} />
                    <Typography
                      variant="body1"
                      gutterBottom
                      align='left'
                      style={{ marginRight: 'auto', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '8px', marginLeft: '8px' }}
                    >
                      {message.text}
                    </Typography>
                  </>
                )}
              </div>
            ))}
          </Box>
          <Box p={2} borderTop="1px solid #ccc" display="flex" alignItems="center">
            <TextField
              label="Type a message"
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              style={{ marginLeft: '8px' }}
            >
              Send
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Chat;

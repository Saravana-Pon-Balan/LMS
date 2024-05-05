import React, { useState } from 'react';
import ContactList from './contactlist';
import Conversation from './conversation';
import {Typography,Box} from '@mui/material'


function Chat({userData}) {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <Box style={{ display: 'flex', width:'calc(100vw - 100px)',height: 'calc(100vh - 104px)', overflow: 'hidden' }}>
      <ContactList onSelectContact={handleContactSelect} userData={userData} />
      {selectedContact ? (<Conversation selectedContact={selectedContact} userData={userData}/>)
      :(<Typography variant='h4'>Select any contact for chat</Typography>)}
    </Box>
  );
}

export default Chat;

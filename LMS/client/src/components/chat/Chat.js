import React, { useState } from 'react';
import ContactList from './contactlist';
import Conversation from './conversation';

function App() {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div style={{ display: 'flex', width:'calc(100vw - 100px)',height: 'calc(100vh - 104px)', overflow: 'hidden' }}>
      <ContactList onSelectContact={handleContactSelect} />
      <Conversation selectedContact={selectedContact} />
    </div>
  );
}

export default App;

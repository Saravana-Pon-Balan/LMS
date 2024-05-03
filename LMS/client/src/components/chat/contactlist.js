import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField } from '@mui/material';

const contacts = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
];

const ContactList = ({ onSelectContact }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        id="search"
        label="Search contacts"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <List>
        {filteredContacts.map(contact => (
          <ListItem key={contact.id} onClick={() => onSelectContact(contact)}>
            <ListItemText primary={contact.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ContactList;

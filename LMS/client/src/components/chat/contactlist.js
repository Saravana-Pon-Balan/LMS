// ContactList.js
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const contacts = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
];

const ContactList = ({ onSelectContact }) => {
  return (
    
    <List>
      {contacts.map(contact => (
        <ListItem key={contact.id} onClick={() => onSelectContact(contact)}>
          <ListItemText primary={contact.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;

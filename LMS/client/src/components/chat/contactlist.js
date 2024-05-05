import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, TextField, Box ,Divider} from '@mui/material';
import axios from 'axios';

const ContactList = ({ onSelectContact, userData }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(contacts);
  useEffect(() => {
    const setUserData = async () => {
      await axios.get(`http://localhost:3001/search_chat_user/${searchTerm}`)
        .then((res) => {
          setContacts(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    setUserData()
  }, [searchTerm])
  useEffect(() => {
    const getUserData = async () => {
      await axios.get(`http://localhost:3001/list_user_data/${userData}`)
        .then((res) => {
          console.log(contacts);
          setContacts(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    getUserData()
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box width={'30%'} borderRight={"1px solid black"}>
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
        {contacts.length > 0 ? (
          contacts.map(contact => (
            <Box sx={{cursor:"pointer"}}>
            <ListItem key={contact.id} onClick={() => onSelectContact(contact)}>
              <ListItemText primary={contact.name} />
            </ListItem>
            <Divider></Divider>
            </Box>
          ))
        ) : (
          <></> 
        )}

      </List>
    </Box>
  );
};

export default ContactList;

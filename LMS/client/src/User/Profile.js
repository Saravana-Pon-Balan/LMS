import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, Divider, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import cookieManager from '../manager/cookieManager';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import {Link} from "react-router-dom";

const UserInfo = styled('div')({
  textAlign: 'left',
  marginBottom: '20px',
});

const PostCard = styled(Card)({
  maxWidth: 300,
  margin: 'auto',
  width: 300, // Fixed width
  height: 350, // Fixed height
  display: 'flex',
  flexDirection: 'column', // Align items in column layout
});

const ImageWrapper = styled('div')({
  flex: 1, // Take up remaining space
  overflow: 'hidden', // Hide overflow content
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Video = styled('video')({
  width: '100%',
  height: 'auto',
});

const Profile = () => {
  const imageExtensions = ['.jpg', '.jpeg', '.png'];
  const videoExtensions = ['.mp4', '.avi', '.mov'];

  const [postsData, setPostsData] = useState([]);
  const [userData, setUserData] = useState({
    followersCount:0,
    followingCount:0,
    user : { name: '',
    bio: '',
    profilePic: '',
    email: '',}
    
  });
  console.log(userData)
  const [isOpen, setIsOpen] = useState(false);

  const userId = cookieManager.getUserInfo();

  useEffect(() => {
    const getUserPost = async () => {
      await axios.post("http://localhost:3001/get_user_post", { uid: userId })
        .then((res) => {
          setPostsData(res.data);
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getUserData = async () => {
      await axios.post("http://localhost:3001/get_user_data", { uid: userId })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getUserData()
    getUserPost()
  }, [])

  const handleEdit = () => {
    setIsOpen(true); // Open the dialog when edit is clicked
  };

  const handleClose = () => {
    setIsOpen(false); // Close the dialog
  };

  const EditDialog = ({ open, handleClose }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [city, setCity] = useState('');
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleBioChange = (event) => {
      setBio(event.target.value);
    };
  
    const handleCityChange = (event) => {
      setCity(event.target.value);
    };
  
    const handleSave = async() => {
      // Implement your save logic here
      await axios.post("http://localhost:3001/set_user_data",{
        id:userId,
        name:name,
        bio:bio,
        city:city
        
      })
      .then((res)=>{
        setUserData({
          ...userData,
          name:name,
          bio:bio,
          city:city,
         
        })
          handleClose();
      })
       // Close the dialog after saving
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            label="Bio"
            type="text"
            fullWidth
            value={bio}
            onChange={handleBioChange}
          />
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            value={city}
            onChange={handleCityChange}
          />
        </DialogContent>
        <Button onClick={handleSave}>Save</Button>
      </Dialog>
    );
  };

  return (
    <Container width={'calc(100vw - 100px)'}>
      <UserInfo>
        <Box display={'flex'}>
          <Avatar alt="Avatar" src={userData.user.profilePic} />
          <Typography variant="h4">{userData.user.name}</Typography>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Box>
        <Typography variant="body1">Bio: {userData.user.bio}</Typography>
        <Typography variant="body1">City: {userData.user.city}</Typography>
        
        {userData.user.email === userId ?<></>: (<Button variant="contained" color="primary">Message</Button>)}
        <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>Following({userData.followingCount})</Button>
        <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>Followers({userData.followersCount})</Button>
      </UserInfo>
      <Divider>Your Posts</Divider>
      <Grid container spacing={2} width={'calc(100vw - 100px)'}>
        {postsData.map(post => (
          <Grid item key={post.id} xs={12} sm={4}>
            <Link to={`/posts/${post._id}`}>
            <PostCard>
              {post.mediaURL && videoExtensions.some(ext => post.mediaURL.endsWith(ext)) && (
                <video controls style={{ maxWidth: '100%' }}>
                  <source src={post.mediaURL} type="video/mp4" />
                </video>
              )}
              {post.mediaURL && imageExtensions.some(ext => post.mediaURL.endsWith(ext)) && (
                <img src={post.mediaURL} alt="Uploaded" style={{ maxWidth: '100%', height: "65%" }} />
              )}
              <CardContent>
                <Typography variant="body1">{post.caption}</Typography>
              </CardContent>
            </PostCard>
            </Link>
          </Grid>
        ))}
      </Grid>
      <EditDialog open={isOpen} handleClose={handleClose} />
    </Container>
  );
}

export default Profile;

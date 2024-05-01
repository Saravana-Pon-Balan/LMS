// src/Profile.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, Divider } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import cookieManager from '../manager/cookieManager';

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
  const userId = cookieManager.getUserInfo();

  useEffect(()=>{
    const getUserPost = async() =>{
        await axios.post("http://localhost:3001/get_user_post",{uid:userId})
        .then((res)=>{
          setPostsData(res.data);
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    getUserPost()
  },[])
  // Mock user data
  const userData = {
    username: 'Saravana',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'City, Country',
  };

  // Mock posts data
  // const postsData = [
  //   {
  //     id: 1,
  //     mediaUrl: 'http://localhost:3001/ef3b42de-1186-4c5e-94da-2366dd1734e8.mp4',
  //     caption: 'Beautiful scenery!',
  //   },
  //   {
  //     id: 2,
  //     mediaUrl: 'http://localhost:3001/f1d20d87-8b52-4cad-9049-e25d13091866.jpeg',
  //     caption: 'Enjoying my vacation 😎',
  //   },
  //   // Add more posts as needed
  // ];

  return (
    <Container width={'calc(100vw - 100px)'}>
      <UserInfo >
        <Typography variant="h4">{userData.username}</Typography>
        <Typography variant="body1">Bio: {userData.bio}</Typography>
        <Typography variant="body2">Location: {userData.location}</Typography>
        <Button variant="contained" color="primary">Message</Button>
        <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>Following</Button>
        <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>Followers</Button>
      </UserInfo>
      <Divider>Your Posts</Divider>
      <Grid container spacing={2} width={'calc(100vw - 100px)'}>
        {postsData.map(post => (
          <Grid item key={post.id} xs={12} sm={4}>
            <PostCard>
            {post.mediaURL && videoExtensions.some(ext => post.mediaURL.endsWith(ext)) && (
                      <video controls style={{ maxWidth: '100%' }}>
                        <source src={post.mediaURL} type="video/mp4" />
                      </video>
                    )}
                    {post.mediaURL && imageExtensions.some(ext => post.mediaURL.endsWith(ext)) && (
                      <img src={post.mediaURL} alt="Uploaded" style={{ maxWidth: '100%',height:"65%" }} />
                    )}
              <CardContent>
                <Typography variant="body1">{post.caption}</Typography>
              </CardContent>
            </PostCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Profile;

// src/Profile.js
import React from 'react';
import { Container, Typography, Avatar, Grid, Card, CardMedia, CardContent } from '@mui/material';

// Mock user data
const userData = {
  username: 'ExampleUser',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  location: 'City, Country',
  followers: 100,
  following: 50,
  avatar: '/path/to/avatar.jpg',
};

// Mock posts data
const postsData = [
  {
    id: 1,
    imageUrl: '/path/to/post1.jpg',
    caption: 'Beautiful scenery!',
  },
  {
    id: 2,
    imageUrl: '/path/to/post2.jpg',
    caption: 'Enjoying my vacation 😎',
  },
  // Add more posts as needed
];

const Profile = () => {
  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar alt="User Avatar" src={userData.avatar} sx={{ width: 150, height: 150 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4">{userData.username}</Typography>
          <Typography variant="body1">Bio: {userData.bio}</Typography>
          <Typography variant="body2">Location: {userData.location}</Typography>
          <Typography variant="body2">Followers: {userData.followers} | Following: {userData.following}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {postsData.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image={post.imageUrl}
                alt="Post Image"
              />
              <CardContent>
                <Typography variant="body1">{post.caption}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Profile;

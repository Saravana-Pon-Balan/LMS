// App.js

import React, { useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, Avatar } from '@mui/material';


const [posts,setPosts] = useState([]);

const cardStyle = {
  marginBottom: '16px', // equivalent to theme.spacing(2)
};

const App = () => {
  return (
    <Container style={{ marginTop: '32px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        LinkedIn Feed
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid key={post.id} item xs={12}>
            <Card style={cardStyle}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar alt={post.author} src={post.avatar} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="h2">{post.author}</Typography>
                    <Typography variant="body1">{post.content}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;

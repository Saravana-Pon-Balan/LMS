import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, Avatar, TextField, Button, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';

const App = (props) => {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const { userData } = props;

  const cardStyle = {
    marginBottom: '16px',
  };

  const fileInputStyle = {
    display: 'none', 
  };

  const fileInputLabelStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    minWidth: '150px',
    height: '40px',
  };

  const postButtonStyle = {
    width: '100%',
    marginTop: '10px',
    height: '40px',
  };

  useEffect(() => {
    async function getPostData() {
      try {
        const res = await axios.get("http://localhost:3001/get_post");
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    getPostData();
  }, []);

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : 'No file chosen');
  };

  const handlePostSubmit = async () => {
    const formData = new FormData();
    formData.append('author', userData); 
    formData.append('content', postContent); 
    formData.append('likes', 0); 
    formData.append('comments', JSON.stringify([])); 

    if (file) {
      formData.append('media', file);
    }

    try {
      await axios.post('http://localhost:3001/upload_posts/', formData);
      setPostContent('');
      setFile(null);
      setFileName('No file chosen');
    } catch (error) {
      console.error('Error posting data to API:', error);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const handleCommentSubmit = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    }));
  };

  return (
    <Container style={{ marginTop: '32px' }}>
      <Typography variant="h4" component="h1" textAlign={'center'} gutterBottom>
        Recent Posts
      </Typography>
      <Grid container spacing={2} ml={'30px'}>
        <Grid item xs={12} width='calc(100vw - 100px)'>
          <Card style={cardStyle} >
            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Share Your Knowledge"
                variant="outlined"
                value={postContent}
                onChange={handlePostContentChange}
                style={{ marginBottom: '16px', width: '100%' }}
              />
              <label htmlFor="file-input" style={fileInputLabelStyle}>
                {fileName}
              </label>
              <input
                id="file-input"
                type="file"
                style={fileInputStyle}
                onChange={handleFileChange}
                accept="image/*, video/*"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePostSubmit}
                style={postButtonStyle}
              >
                Post
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12}>
            <Card style={cardStyle}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar alt={post.author} src={post.avatar} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="h2">{post.author}</Typography>
                    <a href={`/feed/${post.id}`}>
                      <Typography variant="body1">{post.content}</Typography>
                      {post.fileDataURL && post.file.type.startsWith('video') && (
                        <video controls style={{ maxWidth: '100%' }}>
                          <source src={post.fileDataURL} type={post.file.type} />
                        </video>
                      )}
                      {post.fileDataURL && !post.file.type.startsWith('video') && (
                        <img src={post.fileDataURL} alt="Uploaded" style={{ maxWidth: '100%' }} />
                      )}
                    </a>
                    <IconButton aria-label="like" onClick={() => handleLike(post.id)}>
                      <FavoriteIcon /> {post.likes}
                    </IconButton>
                    <IconButton aria-label="comment">
                      <ChatIcon /> {post.comments && post.comments.length}
                    </IconButton>
                    <div>
                      {post.comments && (post.comments.slice(0, 1).map((comment, index) => (
                        <div key={index}>
                          <Avatar alt={comment.author} src={comment.avatar} />
                          <Typography variant="body2">{comment.content}</Typography>
                        </div>
                      )))}
                      {post.comments && post.comments.length > 1 && (
                        <Typography variant="body2">+ {post.comments.length - 1} more comments</Typography>
                      )}
                    </div>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Add a comment"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCommentSubmit(post.id, { author: 'John Doe', avatar: 'https://i.pravatar.cc/300', content: e.target.value });
                          e.target.value = '';
                        }
                      }}
                    />
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

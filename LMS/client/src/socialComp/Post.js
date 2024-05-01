// Post.js
import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Avatar, IconButton, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const imageExtensions = ['.jpg', '.jpeg', '.png'];
  const videoExtensions = ['.mp4', '.avi', '.mov'];
    const {id} = useParams()
    const [postData, setPostData] = useState({
      userId: '',
      content: '',
      mediaURL: '',
      likes: 0, // Initialize likes as a number
      comments: []
    });
  
    console.log(postData);
  
    useEffect(() => {
      const getPostData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/get_post_data/${id}`);
          const postDataFromApi = response.data;
          // Initialize likes as a number
          const likes = postDataFromApi.like ? postDataFromApi.like.length : 0;
          setPostData({ ...postDataFromApi, likes });
        } catch (error) {
          console.log(error);
        }
      };
  
      getPostData();
    }, [id]);
  
    const handleLike = () => {
      setPostData(prevData => ({
        ...prevData,
        likes: prevData.likes + 1
      }));
    };
  
    const handleCommentSubmit = (postId, comment) => {
      setPostData(prevData => ({
        ...prevData,
        comments: [...prevData.comments, comment]
      }));
    };
  return (
    <div>
      <Card style={{ marginBottom: '16px' }}>
        <CardContent>
          <Avatar alt={postData.author} src={postData.avatar} />
          <Typography variant="h6" component="h2">{postData.author}</Typography>
          <Typography variant="body1">{postData.content}</Typography>
          {postData.mediaURL && videoExtensions.some(ext => postData.mediaURL.endsWith(ext)) && (
                      <video controls style={{ maxWidth: '100%' }}>
                        <source src={postData.mediaURL} type="video/mp4" />
                      </video>
                    )}
                    {postData.mediaURL && imageExtensions.some(ext => postData.mediaURL.endsWith(ext)) && (
                      <img src={postData.mediaURL} alt="Uploaded" style={{ maxWidth: '100%' }} />
                    )}
          <IconButton aria-label="like" onClick={() => handleLike(postData.id)}>
            <FavoriteIcon /> {postData.likes}
          </IconButton>
          <IconButton aria-label="comment">
            <ChatIcon /> {postData.comments?.length}
          </IconButton>
          <div>
            {postData.comments?.map((comment, index) => (
              <div key={index}>
                <Avatar alt={comment.author} src={comment.avatar} />
                <Typography variant="body2">{comment.content}</Typography>
              </div>
            ))}
          </div>
          {/* Comment input field */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCommentSubmit(postData.id, { author: 'John Doe', avatar: 'https://i.pravatar.cc/300', content: e.target.value });
                e.target.value = '';
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;

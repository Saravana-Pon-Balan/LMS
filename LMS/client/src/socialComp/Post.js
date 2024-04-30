// Post.js
import React from 'react';
import { Typography, Card, CardContent, Avatar, IconButton, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';

const Post = ({ post, handleLike, handleCommentSubmit }) => {
    console.log(post)
  return (
    <div>
      <Card style={{ marginBottom: '16px' }}>
        <CardContent>
          <Avatar alt={post.author} src={post.avatar} />
          <Typography variant="h6" component="h2">{post.author}</Typography>
          <Typography variant="body1">{post.content}</Typography>
          {post.fileDataURL && post.file.type.startsWith('video') && (
            <video controls style={{ maxWidth: '100%' }}>
              <source src={post.fileDataURL} type={post.file.type} />
            </video>
          )}
          {post.fileDataURL && !post.file.type.startsWith('video') && (
            <img src={post.fileDataURL} alt="Uploaded" style={{ maxWidth: '100%' }} />
          )}
          <IconButton aria-label="like" onClick={() => handleLike(post.id)}>
            <FavoriteIcon /> {post.likes}
          </IconButton>
          <IconButton aria-label="comment">
            <ChatIcon /> {post.comments.length}
          </IconButton>
          <div>
            {post.comments.map((comment, index) => (
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
                handleCommentSubmit(post.id, { author: 'John Doe', avatar: 'https://i.pravatar.cc/300', content: e.target.value });
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

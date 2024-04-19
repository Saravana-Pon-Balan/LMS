import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Avatar, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const LinkedInFeed = () => {
  const [newPostContent, setNewPostContent] = useState('');
  const [files, setFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [feedData, setFeedData] = useState([]);

  const onDrop = acceptedFiles => {
    setFiles([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('author', 'Your Name');
      formData.append('postContent', newPostContent);
      files.forEach(file => formData.append('files', file));

      const response = await axios.post('http://localhost:3001/add_posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const newPost = response.data;
      setFeedData([newPost, ...feedData]);
      setNewPostContent('');
      setFiles([]);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="md">
      <Button variant="contained" onClick={handleDialogOpen} style={{ marginBottom: '20px' }}>
        Add Post
      </Button>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Post</DialogTitle>
        <DialogContent>
          <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', marginBottom: '20px' }}>
            <input {...getInputProps()} />
            <Typography variant="body1" align="center">
              Drag 'n' drop some files here, or click to select files
            </Typography>
          </div>
          {files.map((file, index) => (
            <div key={index}>
              {file.type.startsWith('image') ? (
                <img src={URL.createObjectURL(file)} alt={`Uploaded Image ${index}`} style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '10px' }} />
              ) : (
                <video src={URL.createObjectURL(file)} controls style={{ maxWidth: '100%', marginBottom: '10px' }} />
              )}
            </div>
          ))}
          <TextField
            multiline
            rows={4}
            placeholder="Write your post here..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handlePostSubmit}>Post</Button>
        </DialogActions>
      </Dialog>
      {/* Render existing feedData */}
    </Container>
  );
};

export default LinkedInFeed;

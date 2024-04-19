import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button } from '@mui/material';

function CourseCreation(props) {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState(null);
  const {userData} = props;

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      console.log("Uploaded with ID:", id);
      navigate(`/coursecreation/${id}/${courseName}`);
    }
  }, [id]);


  const createCourse = async () => {
    const formData = new FormData();
    formData.append("title", courseName);
    formData.append("description", courseDescription);
    formData.append("media", image); 
    formData.append("email",userData);
  
    try {
      const response = await axios.post("http://localhost:3001/upload_course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      const courseId = response.data;
      setId(courseId);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  

  return (
    <Container maxWidth="sm">
      <h1>Create a New Course</h1>
      <TextField
        label="Course Name"
        fullWidth
        margin="normal"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <TextField
        label="Course Description"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
      />
      <TextField
        margin="dense"
        id="videoInput"
        label="thumbnail"
        type="file"
        fullWidth
        variant="standard"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <Button variant="contained" color="primary" onClick={createCourse}>
        Create Course
      </Button>
    </Container>
  );
}

export default CourseCreation;

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button } from '@mui/material';

function CourseCreation() {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      console.log("Uploaded with ID:", id);
      // Navigate to the new route after id is updated
      navigate(`/coursecreation/${id}/${courseName}`);
    }
  }, [id]);


  const createCourse = async() => {
    const data = {
      title: courseName,
      description: courseDescription
    }
    await axios
      .post("http://localhost:3001/upload_course", data)
      .then(upload => {
        console.log(upload.data);
        const Id = upload.data;
        setId(Id);
      })
      .catch(error => console.log(error));
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
      <Button variant="contained" color="primary" onClick={createCourse}>
        Create Course
      </Button>
    </Container>
  );
}

export default CourseCreation;

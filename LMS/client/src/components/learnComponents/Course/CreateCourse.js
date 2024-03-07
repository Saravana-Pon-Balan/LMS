import React, { useState } from 'react';
import {  Link } from "react-router-dom";

import { Container, TextField, Button } from '@mui/material';

function CourseCreation() {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleCreateCourse = () => {
    // Handle course creation logic here
    console.log('Creating course:', { courseName, courseDescription });
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
      <Link to={`/coursecreation/${courseName}`} style={{ textDecoration: "none",color:"white" }}>
      <Button variant="contained" color="primary" onClick={handleCreateCourse}>
        Create Course
      </Button>
      </Link>
    </Container>
  );
}

export default CourseCreation;

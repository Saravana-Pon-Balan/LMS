import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import CourseCard from './CourseCard';
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get("http://localhost:3001/");
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCourse();
  }, []); 

  return (
    <Grid container spacing={2} sx={{maxWidth:"100vw", display: "flex", overflowY: "scroll", position: "relative"}}>
      {courses.map((course) => (
        <Grid item key={course.id} xs={12} sm={6} md={5} lg={4}>
          <CourseCard
            id={course.id}
            title={course.title}
            description={course.description}
          />
        </Grid>
      ))}
    </Grid>    
  );
};

export default CourseList;

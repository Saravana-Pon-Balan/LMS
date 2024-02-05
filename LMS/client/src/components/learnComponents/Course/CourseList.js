import React from 'react';
import { Grid } from '@mui/material';
import CourseCard from './CourseCard';
import courses from "./Courses";
const CourseList = () => {
  return (
    <Grid container spacing={2} sx={{maxWidth:"100vw",display: "flex",overflowY: "scroll",position:"relative"}}>
      {courses.map((course) => (
        <Grid item key={course.id}
         xs={12} sm={6} md={5} lg={4}>
          <CourseCard
            id = {course.id}
            title={course.title}
            description={course.description}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseList;

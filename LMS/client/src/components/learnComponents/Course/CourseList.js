import React from 'react';
import { Grid } from '@mui/material';
import CourseCard from './CourseCard';

const CourseList = ({ courses }) => {
  return (
    <Grid container spacing={5} sx={{display: "flex",overflowY: "scroll",position:"relative"}}>
      {courses.map((course) => (
        <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
          <CourseCard
            title={course.title}
            description={course.description}
            buttonText="Enroll Now"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseList;

import React from 'react';
import { Grid } from '@mui/material';
import CourseCard from './CourseCardPage';

const CourseListPage = (props) => {
   const {course,open,creator} = props;
    
  return (
    course.length > 0 ? (
      <Grid container spacing={2} sx={{ width: open ? "calc(100vw - 150px)" : "calc(100vw - 50px)", display: "flex", overflowY: "scroll", position: "relative" }}>
        {course.map((course) => (
          
          <Grid item key={course.id} xs={12} sm={6} md={5} lg={4}>
            <CourseCard
              id={creator?course._id:course.id}
              title={course.title}
              description={course.description}
              creator={creator}
            />
          </Grid>
        ))}
      </Grid>
    ) : (
      <h2>You Don't Have Any Content</h2>
    )
    
  );
};

export default CourseListPage;

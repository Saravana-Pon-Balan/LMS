import React from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import CourseCard from './CourseCardPage';

const CourseListPage = (props) => {
   const {course,open,creator,recommended} = props;
    console.log(recommended.length)
  return (
    <>    

    {recommended?.length>0?(
      <>
      <Divider>Recommended Courses</Divider>

      <Grid container spacing={2} sx={{ width: open ? "calc(100vw - 150px)" : "calc(100vw - 50px)", display: "flex", overflowY: "scroll", position: "relative" }}>
        {recommended.map((rec) => (
          
          <Grid item key={rec.id} xs={12} sm={6} md={5} lg={4}>
            <CourseCard
              id={rec.id}
              title={rec.title}
              description={rec.description}
              thumbnail={rec.picture}
              creator={rec.creator}
            />
          </Grid>
        ))}
      </Grid>
      </>
    ):<></>}
    <Divider>List Of Courses</Divider>

    {course.length > 0 ? (
      <Grid container spacing={2} sx={{ width: open ? "calc(100vw - 150px)" : "calc(100vw - 50px)", display: "flex", overflowY: "scroll", position: "relative" }}>
        {course.map((course) => (
          
          <Grid item key={course.id} xs={12} sm={6} md={5} lg={4}>
            <CourseCard
              id={creator?course._id:course.id}
              title={course.title}
              description={course.description}
              thumbnail={creator?course.thumbnail:course.picture}
              creator={creator}
            />
          </Grid>
        ))}
      </Grid>
    ) : (
      <h2>You Don't Have Any Content</h2>
    )}
    </>
    

  );
  
};

export default CourseListPage;
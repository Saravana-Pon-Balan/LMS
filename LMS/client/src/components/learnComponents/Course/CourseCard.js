import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const CourseCard = ({ title, description, buttonText }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',border:"1px solid gray" ,boxShadow:" inset 14px -1px 42px 1px rgba(145,136,145,0.9)"}}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-end', margin: '8px' }}>
        {buttonText}
      </Button>
    </Card>
  );
};

export default CourseCard;

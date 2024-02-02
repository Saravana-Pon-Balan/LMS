import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img from "/home/saravana/project/LMS/client/src/components/learnComponents/Course/img/mui-react.avif";
export default function CourseCard(props) {
  const {title,description} = props;
  return (
    <Card sx={{ margin:"20px",maxWidth: 380,boxShadow: "inset 13px 20px 42px 11px rgba(0,100,0,0.73)" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title="MUI"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{float:"right"}}>
        <Button size="medium" variant='outlined'>Share</Button>
        <Button size="medium" variant='outlined'>Learn More</Button>
      </CardActions>
    </Card>
  );
}
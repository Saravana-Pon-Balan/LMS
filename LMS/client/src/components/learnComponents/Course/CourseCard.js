import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img from "/home/saravana/project/LMS/client/src/components/learnComponents/Course/img/mui-react.avif";
import { Link } from 'react-router-dom';
export default function CourseCard(props) {
  const {id,title,description} = props;
  return (
    <Link style={{textDecoration:"none"}} to={`/courses/${id}`} >
    <Card 
    sx={{ margin:"20px",
    maxWidth: 380,
    boxShadow: "13px 20px 42px 11px rgba(1,3,5,0.73)",
    borderRadius:"10px"
    }}
    
    >
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
    </Link>
  );
}

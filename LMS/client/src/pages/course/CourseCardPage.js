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
  const {id,title,description,creator} = props;
  
  return (
    
    <Link style={{textDecoration:"none"}} to={!creator?`/courses/${id}`:`/coursecreation/${id}/${title}/edit`} >
    <Card 
    sx={{ margin:"20px",
    maxWidth: 380,
    boxShadow: "3px 9px 6px 4px rgba(14, 14, 14, 0.48)",
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
      </CardActions>
    </Card>
    </Link>
  );
}

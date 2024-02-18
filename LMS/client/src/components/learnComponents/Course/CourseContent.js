import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import video from './Video/jsc.mp4';
export default function MediaControlCard() {

  return (
      
      <CardMedia
        component="video"
        sx={{ width: "100%",height:"100%" }}
        image={video}
        controls
        alt="Live from space album cover"
      />
  );
}
user management 
course management
compiler
recommendation System
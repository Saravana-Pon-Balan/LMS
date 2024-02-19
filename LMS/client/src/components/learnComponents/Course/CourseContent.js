import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
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


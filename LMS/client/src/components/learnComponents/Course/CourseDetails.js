import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import img from "./img/mui-react.avif";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Link } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams();
  const name = "WebDevelopment"
  return (
    <Box padding={"10px"}>
    <Typography variant="h2" color="initial">
      {name}
    </Typography>
    <Box margin={"10px"} display={"flex"} maxHeight={"350px"} width={"calc(100vw - 100px)"}>
  <Box display={"flex"} flexDirection={"column"}>
    <img src={img} alt="Thumbnail" width={"350px"} height={"300px"} style={{borderRadius:"10px"}}/>
    <Link to={`/courses/${id}/${name}`} > <Button 
    variant="contained" 
    color="primary" 
    height="60px" 
    style={{marginTop:"20px",width:"100%"}}>
      Start
    </Button></Link>
  </Box>
  <Box
    padding={"20px"}
    marginLeft={"20px"}
    border={"3px solid black"}
    flex={"3"}
   
  >
    <Typography variant="h5" color="initial">
      Description
    </Typography>
    <Typography variant="body1" color="initial"  style={{height:"94%", overflowY: "scroll" }}>
      Here you can learn Web Development form basic
      Here you can learn Web Development form basic
      Here you can learn Web Development form basic
      Here you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basic
      Here you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basicHere you can learn Web Development form basic

    </Typography>
  </Box>
  <Box
    border={"3px solid black"} 
    marginLeft={"10px"} 
    padding={"20px"}
    maxWidth={"280px"}
    sx={{wordWrap:"break-word"}}
  >
    <Typography variant="h5" color="initial">
      Publisher
    </Typography>
    <Typography variant="body1" color="initial">
      Author: abc
      channel: xyz
    </Typography>
  </Box>
</Box>


    <Box width={"100%"} border={"3px solid black"}>
      <Typography variant="h5">
      Contents
      </Typography>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        height="30px"
         sx = {{fontSize:"30px"}}
      >
        <TreeItem nodeId="1" label="Introduction" >
          <TreeItem nodeId="2" label="About the Course" />
          <TreeItem nodeId="2" label="About the Course" />
          <TreeItem nodeId="2" label="About the Course" />
          <TreeItem nodeId="2" label="About the Course" />
          <TreeItem nodeId="2" label="About the Course" />
          <TreeItem nodeId="2" label="About the Course" />
          <TreeItem nodeId="2" label="About the Course" />
          
        </TreeItem>
        <TreeItem nodeId="3" label="Tags">
          <TreeItem nodeId="4" label="About the Course" />
          <TreeItem nodeId="4" label="About the Course" />
          <TreeItem nodeId="4" label="About the Course" />
          <TreeItem nodeId="4" label="About the Course" />
          <TreeItem nodeId="4" label="About the Course" />
          <TreeItem nodeId="4" label="About the Course" />
          <TreeItem nodeId="4" label="About the Course" />
          
        </TreeItem>
      </TreeView>
    </Box>
    </Box>
  );
};

export default CourseDetails;

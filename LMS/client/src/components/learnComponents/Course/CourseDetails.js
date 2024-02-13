import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import img from "/home/saravana/project/LMS/client/src/components/learnComponents/Course/img/mui-react.avif";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const CourseDetails = () => {
  const { id } = useParams();

  return (
    <>
    <Box margin={"10px"} display={"flex"}>
      <Box display={"flex"} flexDirection={"column"}>
        <img src={img} alt="Thumbnail" width={"350px"} height={"300px"} style={{borderRadius:"10px"}}/>
        <Button variant="outlined" color="primary" height="60px" style={{marginTop:"20px"}}>
          Start
        </Button>
      </Box>
      <Box
        padding={"20px"}
        marginLeft={"20px"}
        border={"3px solid black"}
        maxWidth={"60%"}
      >
        <Typography variant="h5" color="initial">
          Description
        </Typography>
        <Typography variant="body1" color="initial">
          Description widuwhedwul2irgelf iu r wfbifb fbweifbweifb bf b
          iuhwefuwefwfbawfvbufvsadvhbdsjvbasjfbwI
        </Typography>
      </Box>
      <Box border={"3px solid black"} 
      marginLeft={"10px"} 
      padding={"20px"}
      maxWidth={"280px"}
      sx={{wordWrap:"break-word"}}

      >
        <Typography variant="h5" color="initial">
          Publisher
        </Typography>
        <Typography variant="body1" color="initial">
          Description widuwhedwul2irgelf iu r wfbifb fbweifbweifb bf b
          iuhwefuwefwfbawfvbufvsadvhbdsjvbasjfbwI
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
      >
        <TreeItem nodeId="1" label="Introduction">
          <TreeItem nodeId="2" label="About the Course" />
        </TreeItem>
      </TreeView>

    </Box>
    </>
  );
};

export default CourseDetails;

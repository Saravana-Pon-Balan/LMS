import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import img from "./img/mui-react.avif";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import axios from 'axios';

const CourseDetails = (props) => {
  const { id } = useParams();
  const {userData} = props
  const [courseDetails, setCourseDetails] = useState({
    name: "",
    description: "",
    publisher: "",
    contents: []
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.post("http://localhost:3001/getCourseDetails", {
          courseId : id 
        });
        const { title, description, creator, contents } = response.data;
        setCourseDetails({
          name: title,
          description: description,
          publisher: creator,
          contents: contents
        });
      } catch (error) {
        console.log(error);
      }
    };
    
    

    fetchCourseDetails();
  }, [id]);

  const handleEnroll = async() =>{
    console.log("loged")
    try {
      const response = await axios.post("http://localhost:3001/set_course_enroll", {
        courseId : id ,
        email:userData
      });
     console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box padding={"10px"}>
      <Typography variant="h2" color="initial">
        {courseDetails.name}
      </Typography>
      <Box margin={"10px"} display={"flex"} maxHeight={"350px"} width={"calc(100vw - 100px)"}>
        <Box display={"flex"} flexDirection={"column"}>
          <img src={img} alt="Thumbnail" width={"350px"} height={"300px"} style={{ borderRadius: "10px" }} />
        
        <Link to={`/coursecontent/${id}`}>
        <Button onClick={handleEnroll} variant="contained" color="primary" height="60px" style={{ marginTop: "20px", width: "100%" }}>
            Start
          </Button>
          </Link>
        </Box>
        <Box padding={"20px"} marginLeft={"20px"} border={"3px solid black"} flex={"3"}>
          <Typography variant="h5" color="initial">
            Description
          </Typography>
          <Typography variant="body1" color="initial" style={{ height: "94%", overflowY: "scroll" }}>
            {courseDetails.description}
          </Typography>
        </Box>
        <Box border={"3px solid black"} marginLeft={"10px"} padding={"20px"} maxWidth={"280px"} sx={{ wordWrap: "break-word" }}>
          <Typography variant="h5" color="initial">
            Publisher
          </Typography>
          <Typography variant="body1" color="initial">
            Author: {courseDetails.publisher}
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
    sx={{ fontSize: "30px" }}
  >
    {courseDetails.contents ? (
      courseDetails.contents.map((content, index) => (
        <TreeItem key={index} nodeId={index.toString()} label={content.dir_name}>
          {content.files.map((file, idx) => (
            <TreeItem key={idx} nodeId={`${index}-${idx}`} label={file.file_name} />
          ))}
        </TreeItem>
      ))
    ) : (
      <TreeItem nodeId="1" label="No contents available" />
    )}
  </TreeView>
</Box>

    </Box>
  );
};

export default CourseDetails;

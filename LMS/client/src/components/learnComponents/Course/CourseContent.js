import { React, useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@mui/material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function CourseContent(props) {
  const { open } = props;
  const [value, setValue] = useState('1');
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState('');
  const [courseData, setCourseData] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [discussion, setDiscussion] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/course_content/${id}`)
      .then(response => {
        setCourseData(response.data);

      })
      .catch(error => {
        console.error('Error fetching course content:', error);
      });
  }, [id]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  const handleFileClick = (file) => {
    setVideoUrl("http://localhost:3001/" + file.media_path.split('/').pop());
    console.log(file);
    setQuiz(file.quizes);
    setDiscussion(file.discussion);
    setCaptions(file.caption);
  };


  const sidebarWidth = open ? 230 : 100;

  return (
    <>
      {courseData && ( // Render only if courseData is not null
        <>
          <Typography variant="h4">{courseData.title}</Typography>
        </>
      )}
      <Box
        display="flex"
        width={`calc(100vw - ${sidebarWidth}px)`}
        position="relative"
      >
        <CardMedia
          component="video"
          sx={{ width: "100%", height: "100%", flexGrow: "2" }}
          src={videoUrl}
          controls
          alt="Course video"
        />

        <Box sx={{ flexGrow: "1", maxWidth: "33.33%", marginLeft: "10px" }}>
          <Typography variant="body1" color="initial" fontSize="25px">
            List of Contents
          </Typography>
          <Box>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              height="30px"
              sx={{ fontSize: "30px" }}
            >
              {/* Render tree view items based on 'files' state */}
              {courseData && courseData.contents.map((content, index) => (
                <TreeItem key={index} nodeId={index.toString()} label={content.dir_name}>
                  {content.files.map((file, idx) => (
                    <TreeItem
                      key={idx}
                      nodeId={`${index}-${idx}`}
                      label={file.file_name}
                      onClick={() => handleFileClick(file)}
                    />
                  ))}
                </TreeItem>
              ))}
            </TreeView>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: `calc(100vw - ${sidebarWidth}px)`, typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Description" value="1" sx={{ marginLeft: "10%" }} />
              <Tab label="Quiz" value="2" sx={{ marginLeft: "10%" }} />
              <Tab label="Discussion" value="3" sx={{ marginLeft: "10%" }} />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Typography>{captions}</Typography>
          </TabPanel>
          <TabPanel value="2">{quiz}</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

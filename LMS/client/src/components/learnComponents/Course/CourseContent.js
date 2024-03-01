import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import video from "./Video/jsc.mp4";
import { Box, Typography } from "@mui/material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


export default function CourseContent(props) {
  const { open } = props;
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sidebarWidth = open ? 230 : 100;
  return (
    <>
    <Box
      display="flex"
      width={`calc(100vw - ${sidebarWidth}px)`}
      position={"relative"}
    >
      <CardMedia
        component="video"
        sx={{ width: "66.66%", height: "100%", flexGrow: "2" }}
        image={video}
        controls
        alt="Live from space album cover"
      />
      <Box sx={{ flexGrow: "1", maxWidth: "33.33%", marginLeft: "10px" }}>
        <Typography variant="body1" color="initial" fontSize={"25px"}>
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
            <TreeItem
              nodeId="1"
              label="Introduction"
              sx={{ fontSize: "large" }}
            >
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
      
    </Box>
    <Box sx={{ width: `calc(100vw - ${sidebarWidth}px)`, typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <TabList onChange={handleChange}
         
          >
          <Tab label="Item One" value="1" sx={{marginLeft:"10%"}} />
          <Tab label="Item Two" value="2" sx={{marginLeft:"10%"}}/>
          <Tab label="Item Three" value="3" sx={{marginLeft:"10%"}}/>
        </TabList>
      </Box>
      <TabPanel value="1">Item One</TabPanel>
      <TabPanel value="2">Item Two</TabPanel>
      <TabPanel value="3">Item Three</TabPanel>
    </TabContext>
  </Box>
  </>
  );
}

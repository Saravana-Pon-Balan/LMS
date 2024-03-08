import React, { useState } from 'react';
import { Container, Typography, Box, TextField,TextareaAutosize, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useParams } from "react-router-dom";
import axios from "axios";

function CourseCreationPage() {
  const { id,name } = useParams();
  const [fileName, setFileName] = useState("");
  const [videoInput, setVideoInput] = useState(null);
  const [caption, setCaption] = useState("");
  const [courseStructure, setCourseStructure] = useState([
    {
      title: 'HTML Course',
      children: [
        "base"
      ]
    }
]);
  const [openAddDirectoryDialog, setOpenAddDirectoryDialog] = useState(false);
  const [newDirectoryName, setNewDirectoryName] = useState("");
  
  const renderTree = (nodes) =>
  nodes.map((node,key) => {
    if (typeof node === 'string') {
      return (
        <TreeItem key={key} nodeId={node} label={node}>
          {/* No children to render for strings */}
        </TreeItem>
      );
    } else {
      return (
        <TreeItem key={node.title} nodeId={node.title} label={node.title}>
          {Array.isArray(node.children) && node.children.length > 0
            ? node.children.map((childNode) => renderTree([childNode]))
            : null}
        </TreeItem>
      );
    }
  });



  const handleSaveDirectory = () => {
      setCourseStructure((prev)=>[...prev,{title:newDirectoryName,children:[]}])
      setOpenAddDirectoryDialog(false)
      
      const data = {
        courseId :id,
        directory:newDirectoryName
      }
      axios.post("http://localhost:3001/add-directory",data)
      setNewDirectoryName("")
  }

  const handleAddFile = () => {
    const updatedCourseStructure = [...courseStructure]; 
    const lastIndex = updatedCourseStructure.length - 1; 
    updatedCourseStructure[lastIndex].children.push(fileName); 
    setCourseStructure(updatedCourseStructure); 
    console.log(videoInput);
    const data = {
      courseId :id,
      name:fileName,
      media:videoInput,
      cp:caption
    }
    axios.post("http://localhost:3001/add-file",data)
    
    setFileName("")
    setVideoInput(null)
    setCaption("")
  }
const handleAddDirectoryClose=()=>{

}

  return (
    <Container maxWidth="lg" width="100%">
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          
          <TextField
            margin="dense"
            id="fileName"
            label="File Name"
            fullWidth
            variant="standard"
            value={fileName}
            required
            onChange={(e) => setFileName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="videoInput"
            label="Video Input"
            type="file"
            fullWidth
            variant="standard"
            value={videoInput}
            onChange={(e) => setVideoInput(e.target.files[0])}
          />
          <TextareaAutosize
            margin="dense"
            id="caption"
            label="Caption"
            fullWidth
            maxRows={"10"}
            minRows={"10"}
            variant="standard"
            placeholder="Enter Caption here..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{width:"100%"}}
          />
          <Button variant="contained" color="primary" onClick={handleAddFile}>
            Add File
          </Button>
          <Button variant="contained" color="primary" onClick={() => setOpenAddDirectoryDialog(true)} style={{ marginLeft: '10px' }}>
            Add Directory
          </Button>
        </Box>
        <Box sx={{ width: '50%' }}>
            <Typography variant="h4" gutterBottom>
            Course Structure
          </Typography>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderTree(courseStructure)}
          </TreeView>
        </Box>
      </Box>

      <Dialog open={openAddDirectoryDialog} onClose={handleAddDirectoryClose}>
        <DialogTitle>Add Directory</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="directoryName"
            label="Directory Name"
            fullWidth
            variant="standard"
            value={newDirectoryName}
            onChange={(e) => setNewDirectoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenAddDirectoryDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveDirectory} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CourseCreationPage;

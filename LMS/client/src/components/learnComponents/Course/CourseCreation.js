import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useParams } from "react-router-dom";

function CourseCreationPage() {
  const { name } = useParams();
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
      setNewDirectoryName("")
  }

  const handleAddFile = () => {
    const updatedCourseStructure = [...courseStructure]; // Make a copy of the state
    const lastIndex = updatedCourseStructure.length - 1; // Get the index of the last item
    updatedCourseStructure[lastIndex].children.push(fileName); // Push the new file name
    setCourseStructure(updatedCourseStructure); 
    setFileName("")
    setVideoInput(null)
    setCaption("")
  }
const handleAddDirectoryClose=()=>{

}

  return (
    <Container maxWidth="lg">
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
            onChange={(e) => setVideoInput(e.target.value)}
          />
          <TextField
            margin="dense"
            id="caption"
            label="Caption"
            fullWidth
            variant="standard"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
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

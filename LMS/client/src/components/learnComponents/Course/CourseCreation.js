import { TreeItem, TreeView } from "@mui/x-tree-view";
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon, Add as AddIcon } from '@mui/icons-material';

function CourseCreationPage() {
  const [treeItems, setTreeItems] = useState([
    {
      id: '1',
      label: 'Introduction',
      children: [
        { id: '2', label: 'About the Course' }
      ],
    },
  ]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openAddFileDialog, setOpenAddFileDialog] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const handleAddDirectory = () => {
    setOpenAddDialog(true);
  };

  const handleAddFile = () => {
    setOpenAddFileDialog(true);
  };

  const handleAddFileConfirm = () => {
    if (!selectedNodeId) {
      alert("Please select a directory to add a file.");
      return;
    }
    const newId = (Math.random() * 100000).toString(); // generate unique ID
    const newFile = {
      id: newId,
      label: 'New File',
    };
    const updatedTreeItems = treeItems.map(node => {
      if (node.id === selectedNodeId) {
        return { ...node, children: [...node.children, newFile] };
      }
      return node;
    });
    setTreeItems(updatedTreeItems);
    setOpenAddFileDialog(false);
  };

  const handleAddDirectoryConfirm = (name) => {
    const newId = (Math.random() * 100000).toString(); // generate unique ID
    const newDirectory = {
      id: newId,
      label: name,
      children: [],
    };
    setTreeItems([...treeItems, newDirectory]);
    setOpenAddDialog(false);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setOpenAddFileDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h2>Add Video or Text</h2>
        <TextField
          label="Video URL"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Text Content"
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddDirectory}>
        <AddIcon />
        Add Directory
      </Button>

      <Button variant="contained" color="primary" onClick={handleAddFile}>
        <AddIcon />
        Add File
      </Button>

        {/* Add Directory Dialog */}
        <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add Directory</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Directory Name"
            fullWidth
            variant="standard"
            onChange={(e) => setSelectedNodeId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={() => handleAddDirectoryConfirm(selectedNodeId)} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddFileDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add File</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="file"
            label="File Name"
            fullWidth
            variant="standard"
            onChange={(e) => setSelectedNodeId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleAddFileConfirm} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      </div>

      <div>
        <h2>Course Structure</h2>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {treeItems.map((node) => (
            <TreeItem key={node.id} nodeId={node.id} label={node.label}>
              {node.children.map((child) => (
                <TreeItem key={child.id} nodeId={child.id} label={child.label} />
              ))}
            </TreeItem>
          ))}
        </TreeView>
      </div>
    </Container>
  );
}

export default CourseCreationPage;



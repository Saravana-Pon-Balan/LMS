import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useParams } from "react-router-dom";
import axios from "axios";

function CourseCreationPage() {
  const { id, name } = useParams();
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
  const [openQuizDialog, setOpenQuizDialog] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const handleSaveDirectory = () => {
    setCourseStructure((prev) => [...prev, { title: newDirectoryName, children: [] }])
    setOpenAddDirectoryDialog(false)

    const data = {
      courseId: id,
      directory: newDirectoryName
    }
    axios.post("http://localhost:3001/add_directory", data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error adding directory:', error);
      });

    setNewDirectoryName("")
  }

  const handleAddFile = () => {
    const updatedCourseStructure = [...courseStructure];
    const lastIndex = updatedCourseStructure.length - 1;
    updatedCourseStructure[lastIndex].children.push(fileName);
    setCourseStructure(updatedCourseStructure);
    console.log(videoInput);

    const formData = new FormData();
    formData.append('media', videoInput);
    formData.append('name', fileName);
    formData.append('caption', caption);
    formData.append('courseId', id);
    formData.append('quiz',quizQuestions);

    axios.post("http://localhost:3001/add_file", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error adding file:', error);
      });

    setFileName("");
    setVideoInput(null);
    setCaption("");
  }

  const handleAddDirectoryClose = () => {
    setOpenAddDirectoryDialog(false);
  }

  const handleAddQuestion = () => {
    setQuizQuestions(prev => [...prev, { question: '', options: [''], correctOption: '' }]);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].options.push('');
    setQuizQuestions(updatedQuestions);
  };

  const handleQuestionChange = (questionIndex, event) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].question = event.target.value;
    setQuizQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuizQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, event) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].correctOption = event.target.value;
    setQuizQuestions(updatedQuestions);
  };

  const renderQuizQuestions = () => {
    return quizQuestions.map((questionData, questionIndex) => (
      <div key={questionIndex}>
        <TextField
          margin="dense"
          label={`Question ${questionIndex + 1}`}
          fullWidth
          variant="standard"
          value={questionData.question}
          onChange={(e) => handleQuestionChange(questionIndex, e)}
        />
        {questionData.options.map((option, optionIndex) => (
          <div key={optionIndex}>
            <TextField
              margin="dense"
              label={`Option ${optionIndex + 1}`}
              fullWidth
              variant="standard"
              value={option}
              onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
            />
          </div>
        ))}
        <TextField
          margin="dense"
          label={`Correct Option for Question ${questionIndex + 1}`}
          fullWidth
          variant="standard"
          value={questionData.correctOption}
          onChange={(e) => handleCorrectOptionChange(questionIndex, e)}
        />
        <Button variant="contained" color="primary" sx={{marginBottom:"20px"}} onClick={() => handleAddOption(questionIndex)}>
          Add Option
        </Button>
      </div>
    ));
  };


 

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
        onChange={(e) => setVideoInput(e.target.files[0])}
      />
      <TextField
        margin="dense"
        id="caption"
        label="Caption"
        fullWidth
        variant="standard"
        placeholder="Enter Caption here..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Box display={openQuizDialog?"block":"none"} >
  
        <Typography variant="h4" gutterBottom>
          Quiz Creation
        </Typography>
        
        {renderQuizQuestions()}
        <Button variant="contained" sx={{marginBottom:"20px"}} color="primary" onClick={handleAddQuestion}>
          Add Question
        </Button>
        
      </Box>
      <Button variant="contained" color="primary" onClick={handleAddFile}>
        Add File
      </Button>
      <Button variant="contained" color="primary" onClick={() => setOpenAddDirectoryDialog(true)} style={{ marginLeft: '10px' }}>
        Add Directory
      </Button>
      <Button variant="contained" color="primary" onClick={() => setOpenQuizDialog(true)} style={{ marginLeft: '10px' }}>
        Add Quiz
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
        {courseStructure.map((node, key) => (
          <TreeItem key={key} nodeId={node.title} label={node.title}>
            {Array.isArray(node.children) && node.children.length > 0
              ? node.children.map((childNode, index) => (
                <TreeItem key={index} nodeId={childNode} label={childNode} />
              ))
              : null}
          </TreeItem>
        ))}
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
      <Button onClick={handleAddDirectoryClose}>Cancel</Button>
      <Button onClick={handleSaveDirectory} color="primary">Save</Button>
    </DialogActions>
  </Dialog>
  
</Container>
);
}

export default CourseCreationPage;

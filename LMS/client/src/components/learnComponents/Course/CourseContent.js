import { React, useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Typography, TextField } from "@mui/material";
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
  const { open, userData } = props;
  const [value, setValue] = useState('1');
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState('');
  const [courseData, setCourseData] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [fileId, setFileId] = useState("");
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
    setFileId(file._id);
  };
  console.log(courseData)

  const Quiz = ({ quizData }) => {
    const handleQuizSubmit = () => {
      // Collect user's selected answers
      const userAnswers = [];
      quizData.forEach((question, index) => {
        const selectedOptionIndex = document.querySelector(`input[name="question${index}"]:checked`)?.value;
        if (selectedOptionIndex) {
          userAnswers.push({
            questionId: question._id,
            selectedOptionIndex: parseInt(selectedOptionIndex)
          });
        }
      });
    
      // Construct payload to send to server
      const payload = {
        user_id: userData, // Assuming you have a userId to associate with the quiz answers
        answers: userAnswers,
        course_id: courseData._id,
        file_id: fileId,
      };
    
      // Make POST request to server
      axios.post('http://localhost:3001/submit_quiz', payload)
        .then(response => {
          console.log('Quiz answers submitted successfully:', response.data);
    
          // Update the courseData state to reflect the quiz submission
          setCourseData(prevCourseData => {
            const updatedFile = { ...prevCourseData.contents.find(content => content._id === fileId), quizSubmitted: true };
            const updatedContents = prevCourseData.contents.map(content => content._id === fileId ? updatedFile : content);
            return { ...prevCourseData, contents: updatedContents };
          });
          console.log(courseData)
    
        })
        .catch(error => {
          console.error('Error submitting quiz answers:', error);
        });
    }
    return (
      <Box>
        {quizData.map((item, index) => (
          <Box key={item._id}>
            <h3>Question {index + 1}</h3>
            <p>{item.question}</p>
            {/* Render options */}
            <ul>
              {item.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label>
                    <input type="radio" name={`question${index}`} value={optionIndex + 1} />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </Box>
        ))}
        <Button variant="contained" onClick={handleQuizSubmit}>Submit</Button>
      </Box>
    );
  };
  const TabPanel = ({ value, index, children }) => {
    return (
      <Box role="tabpanel" hidden={value !== index}>
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </Box>
    );
  };
  const Discussion = () => {
    const [comment, setComment] = useState('');
    const [discussion, setDiscussion] = useState([]);
    console.log(discussion);
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
      if (comment.trim() !== '') {
          setDiscussion([
              ...discussion,
              {
                  id: discussion.length + 1,
                  text: comment,
                  // You can add additional properties here if needed
              }
          ]);
          setComment('');
      }
  };
    const handleKeyPress = (e)=>{
      if(e.code == 'Enter'){
        handleSubmit()
      }
    }

    return (
        <Box>
            <Box height={'200px'} sx={{overflowY:"scroll"}}>
            {discussion.map((comment) => (
                    <Typography padding={'5px'} key={comment.id}>{comment.id}{comment.text}</Typography>
                ))}
            </Box>
            <Box>
                <TextField
                    label="Comment"
                    variant="outlined"
                    value={comment}
                    onChange={handleCommentChange}
                    fullWidth
                    onKeyUp={handleKeyPress}
                />
                
            </Box>
        </Box>
    );
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
          <TabPanel value={value} index="1">
            <Typography>{captions}</Typography>
          </TabPanel>
          <TabPanel value={value} index="2">
            <Quiz quizData={quiz} />
          </TabPanel>
          <TabPanel value={value} index="3">
           <Discussion/>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

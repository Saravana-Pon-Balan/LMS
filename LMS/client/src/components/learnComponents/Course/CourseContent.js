import { React, useState, useEffect,useRef } from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Typography, TextField, Divider } from "@mui/material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import { useParams } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CourseContent(props) {
  const { open, userData } = props;
  const [value, setValue] = useState('1');
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState('');
  const [courseData, setCourseData] = useState(null);
  const [quiz, setQuiz] = useState();
  const [fileId, setFileId] = useState("");
  const [discussion, setDiscussion] = useState([]);
  const [ticFile, setTicFile] = useState();
  const [dirId,setDirId] = useState("");
  const { id } = useParams();
  const treeRef = useRef(null)
  console.log("cdata",courseData);
  useEffect(() => {
    const getCourse = async()=>{
      console.log("1st")
      await axios.get(`http://localhost:3001/course_content/${id}`)
      .then((response) => {
        setCourseData(response.data)
      })
      .catch(error => {
        console.error('Error fetching course content:', error);
      });
    }
      getCourse()
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    console.log("2nd")
    const getViewStatus = async () => {
        const response = await axios.post("http://localhost:3001/get_view_status", {
            cid: id,
            uid: userData
        });
        // Extract the viewed status data from the response
        const viewedStatusData = response.data.contents;

        // Update the course data with viewed status
        const updatedCourseData = courseData?.contents.map(directory => {
            const viewedStatus = viewedStatusData.find(status => status.dir_id === directory._id);
            if (viewedStatus) {
                directory.files.forEach(file => {
                    const fileStatus = viewedStatus.files.find(fileStatus => fileStatus.file_id === file._id);
                    if (fileStatus) {
                        file.viewed = fileStatus.viewed;
                    }
                });
            }
            return directory;
        });
        if (courseData) {
          const unviewedFile = courseData.contents.find(content =>
            content.files.some(file =>!file.viewed)
          );
          console.log(unviewedFile)
            setDirId(unviewedFile._id);
          if (unviewedFile) {
            console.log(unviewedFile);
            const firstUnviewedFile = unviewedFile.files.find(file =>!file.viewed);
            handleFileClick(firstUnviewedFile,dirId);
          }
        }
        // Do something with the updatedCourseData (e.g., set it to state)
    };

    getViewStatus();
  }, [quiz,courseData]);

 

  const handleFileClick =(file,dir_id) => {
    console.log(file)

    console.log("dir:",dir_id);
    setVideoUrl("http://localhost:3001/" + file.media_path.split('/').pop());
    setQuiz(file.quizes);
    setDiscussion(file.discussion);
    setCaptions(file.caption);
    setFileId(file._id);
    setDirId(dir_id)
  };


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

          setTicFile(fileId);
          setCourseData(prevCourseData => {
            const updatedFile = { ...prevCourseData.contents.find(content => content._id === fileId), quizSubmitted: true };
            const updatedContents = prevCourseData.contents.map(content => content._id === fileId ? updatedFile : content);
            return { ...prevCourseData, contents: updatedContents };
          });

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
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };

    const handleSubmit = async() => {
      if (comment.trim() !== '') {
        const data = {
          cid : id,
          uid: userData,
          dir_id: dirId,
          file_id:fileId,
          text: comment,

        }
        await axios.post("http://localhost:3001/set_comment",data)
        .then(()=>{
          setDiscussion([
            ...discussion,
            data
          ]);
          setComment('');

        })
        
      }
    };
    const handleKeyPress = (e) => {
      if (e.code == 'Enter') {
        handleSubmit()
      }
    }

    return (
      <Box>
        <Box height={'200px'} sx={{ overflowY: "scroll" }}>
          {discussion.map((comment) => (
            <Box>
            <Typography padding={'5px'} key={comment.uid}>{comment.user_name}:{comment.comment}</Typography>
            <Divider></Divider>
            </Box>
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
          sx={{ width: "60%", height: "60%", flexGrow: "2" }}
          src={videoUrl}
          controls
          alt="Course video"
        />

        <Box sx={{ flexGrow: "1", maxWidth: "33.33%", marginLeft: "10px" }}>
          <Typography variant="body1" color="initial" fontSize="25px">
            List of Contents
          </Typography>
          <Box>
            <Divider></Divider>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              height="30px"
              sx={{ fontSize: "30px" }}
            >
              {/* Render tree view items based on 'files' state */}
              {courseData && courseData.contents.map((content, index) => (
                <TreeItem key={index} nodeId={index.toString()} label={content.dir_name} id={content._id}>
                  {content.files.map((file, idx) => (
                    <Box display={'flex'}>
                      <TreeItem
                        key={idx}
                        nodeId={`${index}-${idx}`}
                        label={file.file_name}
                        onClick={() => handleFileClick(file,content._id)}
                        ref={treeRef}
/>
                       {file.viewed?<CheckCircleIcon color="success"/>:""}
                    </Box>
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
            <Discussion />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

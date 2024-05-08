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

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/course_content/${id}`);
            const courseData = response.data;

            const viewStatusResponse = await axios.post("http://localhost:3001/get_view_status", {
                cid: id,
                uid: userData
            });
            const viewedStatusData = viewStatusResponse.data.contents;

            const viewedFiles = {};

            const updatedCourseData = courseData.contents.map(content => {

                const updatedFiles = content.files.map(file => {
                   
                  console.log("file",file)
                    const viewedStatus = viewedStatusData.find(status => status.dir_id === content._id);
                    console.log("vs",viewedStatus)
                    if (viewedStatus) {
                        const fileStatus = viewedStatus.files.find(fileStatus => fileStatus.file_id === file._id);
                        if (fileStatus && !viewedFiles[file._id]) {
                            console.log("61",fileStatus)
                            viewedFiles[file._id] = true;
                            return { ...file, viewed: fileStatus.viewed };
                        }
                    }
                    return file;
                });

                return { ...content, files: updatedFiles };
            });

            setCourseData({ ...courseData, contents: updatedCourseData });

            const unviewedFile = updatedCourseData.find(content =>
                content.files.some(file => !file.viewed)
            );

            if (unviewedFile) {
                const firstUnviewedFile = unviewedFile.files.find(file => !file.viewed);
                handleFileClick(firstUnviewedFile, unviewedFile._id);
            }
        } catch (error) {
            console.error('Error fetching course data:', error);
        }
    };

    fetchData();
}, []);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileClick = (file, dir_id) => {
    console.log("file",file,"dirId",dir_id);
    const videoUrl = "http://localhost:3001/" + file.media_path.split('/').pop();
    const quizData = file.quizes;
    const discussionData = file.discussion;
    const captionsData = file.caption;
    const fileId = file._id;
  
    setVideoUrl(videoUrl);
    setQuiz(quizData);
    setDiscussion(discussionData);
    setCaptions(captionsData);
    setFileId(fileId);
    setDirId(dir_id);
  };
  


  const Quiz = ({ quizData }) => {
    const handleQuizSubmit = async () => {
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
  
      try {
          // Make POST request to submit quiz answers
          await axios.post('http://localhost:3001/submit_quiz', payload)
          .then((res)=>{
            console.log("mark",res.data.marks)
          })
  
          // Update file.viewed to true
          const updatedFileData = courseData.contents.map(content => {
              if (content._id === dirId) {
                  const updatedFiles = content.files.map(file => {
                      if (file._id === fileId) {
                          return { ...file, viewed: true };
                      }
                      return file;
                  });
                  return { ...content, files: updatedFiles };
              }
              return content;
          });
  
          // Set updated course data
          setCourseData(prevCourseData => ({
              ...prevCourseData,
              contents: updatedFileData
          }));
          console.log("128",courseData)

  
          // Fetch updated course data
          const updatedCourseDataResponse = await axios.get(`http://localhost:3001/course_content/${id}`);
          const updatedCourseData = updatedCourseDataResponse.data;
  
          // Find the first unviewed file
          const unviewedFile = updatedCourseData.contents.find(content =>
              content.files.some(file => !file.viewed)
          );
  
          if (unviewedFile) {
              const firstUnviewedFile = unviewedFile.files.find(file => !file.viewed);
              handleFileClick(firstUnviewedFile, unviewedFile._id);
          }
      } catch (error) {
          console.error('Error submitting quiz answers:', error);
      }
  };
  
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
        .then((res)=>{
          setDiscussion([
            ...discussion,
            res.data
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
          <Divider></Divider>

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

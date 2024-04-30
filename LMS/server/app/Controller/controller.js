const Models = require("../models");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const mongoose  = require("mongoose");
const Axios = require("axios"); 
const bot = require("../chatbot/index");
require('dotenv').config()
const SaveToSheet = require('../chatbot/savetosheet');


const UserModel = Models.userModel;
const CourseModel = Models.courseModel;
const EnrollModel = Models.courseEnrollModel;
const CodeModel = Models.codeModel;
const PostModel = Models.postModel;

const Coursestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationDir = path.join(__dirname, 'Course');
    // Ensure the destination directory exists, if not create it
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }
    cb(null, destinationDir);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: Coursestorage });


module.exports = {
  createUser: async (req, res) => {
    const requestData = req.body;
    try {
      const userObj = new UserModel(requestData);
      await userObj.saveData();
      res.send(requestData.email);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while saving user.");
    }
  },
  searchUser: async (req, res) => {
    const requestData = req.body;
    try {
      const userInfo = await UserModel.find({ email: requestData.email });
      res.send(userInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while searching for user.");
    }
  },
  createCourse: async (req, res) => {
    const { title, description,email } = req.body;
    console.log(email)
    const thumbnail = req.file.path; 
    try {
      const courseObj = new CourseModel({
        title: title,
        description: description,
        thumbnail: thumbnail,
        creator : email,
      });
      await courseObj.save();
      const courseId = courseObj._id;
      SaveToSheet(title,description,email,courseId);
      res.status(200).send(courseId);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while saving course.");
    }
  },
  addDirectory: async (req, res) => {
    try {
      const { courseId, directory } = req.body;

      const course = await CourseModel.findOne({ _id: courseId });

      if (!course) {
        return res.status(404).send("Course not found");
      }

      course.contents.push({ dir_name: directory });

      await course.save();


      res.status(200).send("Directory added successfully");
    } catch (error) {
      console.error("Error adding directory:", error);
      res.status(500).send("An error occurred while adding directory");
    }
  },
  addFile: async (req, res) => {
    try {
      const { courseId, name, caption, quizQuestions, edit, file_id, dir_id } = req.body;
      const mediaPath = req.file ? req.file.path : null;
      
  
      let course;
  
      if (edit && file_id) {
        // If it's an edit, find the course and update the file data
        course = await CourseModel.findOneAndUpdate(
          { _id: courseId },
          {
            $set: {
              "contents.$[outer].files.$[inner].file_name": name,
              "contents.$[outer].files.$[inner].media_path": mediaPath,
              "contents.$[outer].files.$[inner].caption": caption,
              "contents.$[outer].files.$[inner].quizes": JSON.parse(quizQuestions)
            }
          },
          {
            arrayFilters: [
              { "outer._id": dir_id }, // Filter by dirid
              { "inner._id": file_id } // Filter by fileId
            ],
            new: true // Return the updated document
          }
        );
        res.send(await CourseModel.findById(courseId))
        
      } else {
        // If it's not an edit, find the course by courseId and update the file data
        course = await CourseModel.findOne(
          { _id: courseId }
        );
        if (!course) {
          return res.status(404).send("Course not found");
        }
  
        const n = course.contents.length;
        if (n > 0) {
          course.contents[n - 1].files.push({
            file_name: name,
            media_path: mediaPath,
            caption: caption,
            quizes: [{
              question: quizQuestions.question,
              correct_option: quizQuestions.correctOption,
              options: quizQuestions.options
            }]
          });
        } else {
          course.contents[0].files.push({
            file_name: name,
            media_path: mediaPath,
            caption: caption,
            quizes: [{
              question: quizQuestions.question,
              correct_option: quizQuestions.correctOption,
              options: quizQuestions.options
            }]
          });
        }
  
        await course.save();
      }
  
      if (!course) {
        return res.status(404).send("Course not found");
      }
  
    } catch (error) {
      console.error("Error adding file:", error);
      res.status(500).send("An error occurred while adding file");
    }
  },

  uploadFiles: upload.single("media"),

  courseList: async (req, res) => {
    try {
      const id = req.params.id?req.params.id:null;
      console.log(id)
      if(id!==null){
      const courseObj = await CourseModel.findById(id);
      const listOfCourse = [{
        id: courseObj._id,
        title: courseObj.title,
        description: courseObj.description,
        picture: courseObj.picture
      }];
      console.log(listOfCourse)
      res.send(listOfCourse);
    }
    else{
      const courseObj = await CourseModel.find();
      const listOfCourse = courseObj.map(element => ({
        id: element._id,
        title: element.title,
        description: element.description,
        picture: element.picture
      }));
      res.send(listOfCourse);
    }
    } catch (error) {
      console.error("Error retrieving course list:", error);
      res.status(500).send("An error occurred while retrieving course list");
    }
  },

  addPost : async(req,res)=>{
    console.log(req.body)
    const {author,content} = req.body;
    const mediaPath = req.file ? req.file.path : null;
    console.log(mediaPath)
    const postObj = new PostModel({userId:author,postContent:content,postMedia:mediaPath})
    postObj.save()
    res.send("hi")
  },

  getPost: async(req,res)=>{
    posts = await PostModel.find();
    console.log(posts)
    res.send(posts)
  },

  getCourseDetails: async (req, res) => {
    const { courseId } = req.body;
    
    await CourseModel.findOne({ _id: courseId })
      .then((response) => {
       
        res.send(response)
      }).catch((err) => {
        console.log(err);
      });
  },
  getCourseData : async (req,res)=>{
    try {
      const courseId = req.params.id;
      const course = await CourseModel.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      // Map course contents to course structure
      const courseStructure = course.contents.map(directory => ({
        title: directory.dir_name,
        children: directory.files.map(file => file.file_name)
      }));
      console.log(courseStructure)
      res.json({ courseStructure });
    } catch (error) {
      console.error('Error getting course data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getCourseContent: async (req, res) => {
    try {
      const courseId = req.params.id;
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.json(course); // Return only course contents
    } catch (error) {
      console.error('Error fetching course content:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  compiler : async(req,res)=>{
    let code = req.body.code; 
    let language = req.body.language; 
    let input = req.body.input; 
    let file_name = req.body.file_name;
    if (language == 'python')
        language = 'python3'
   
    let data = ({ 
      language: language,
      version: 'latest',
      code: code,
      input: input
    }); 
    let config = { 
        method: 'post', 
        url: 'https://online-code-compiler.p.rapidapi.com/v1/', 
        headers: { 
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': `${process.env.COMPILER}`,
            'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
        }, 
        data: data 
    }; 
    Axios(config) 
        .then((response) => { 
            res.send(response.data) 
        }).catch((error) => { 
            console.log(error); 
        }); 
  },
  saveCode :async (req,res)=>{
      const requestData = req.body
      const codeObj = await CodeModel(requestData)

      codeObj.saveData()
      res.send("code saved")
  },
  setCourseEnroll: async (req, res) => {
    const requestData = req.body;
    console.log(req.body);
  
    try {
      const course = await CourseModel.findById(requestData.courseId);
      if (!course) {
        return res.status(404).send("Course not found");
      }
  
      const enrollment = await EnrollModel.findOne({
        courseId: requestData.courseId,
        email: requestData.email 
      });
  
      if (!enrollment) {
        const newEnrollment = new EnrollModel({
          courseId: requestData.courseId,
          email: requestData.email 
        });
        await newEnrollment.save();
        console.log("Enrollment saved");
        return res.send("Enrollment saved");
      } else {
        console.log("User already enrolled in the course");
        return res.send("User already enrolled in the course");
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
  getEnrolledCourse: async (req, res) => {
    try {
        const requestData = req.body.email;
        console.log(requestData);
        
        const enrolledCourses = await EnrollModel.find({ email: requestData });
        console.log(enrolledCourses)
        const response = await Promise.all(enrolledCourses.map(async course => {
        const courseDetails = await CourseModel.findOne({ _id: course.courseId });

            return {
                id: courseDetails._id,
                title: courseDetails.title,
                description: courseDetails.description
            };
        }));

        res.send(response);
    } catch (error) {
        console.error("Error retrieving enrolled courses:", error);
        res.status(500).send("Internal server error");
    }
  },
  getOwnCourse: async(req,res)=>{
    const courseDetails = await CourseModel.find({ creator: req.body.email });
    console.log(courseDetails)
    res.send(courseDetails);
  },
  getCourseTitles : async(req,res)=>{
    const courseDetails = await CourseModel.find();
    titleData = []
    courseDetails.forEach((course)=>{
      titleData.push({id:course._id,title:course.title});
    })
    res.send(titleData)
  },

  getFileData: async (req, res) => {
    const id = req.body.course_id;
    const dirName = req.body.node;
    const fileName = req.body.childNode;
  
    try {
      const course = await CourseModel.findById(id);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      const directory = course.contents.find(directory => directory.dir_name === dirName);
  
      if (!directory) {
        return res.status(404).json({ error: 'Directory not found' });
      }
  
      const file = directory.files.find(file => file.file_name === fileName);
      const dirId = directory._id
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      // Return the details of the found file
      res.json({ file ,dir_id:dirId});
    } catch (error) {
      console.error('Error finding file details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  

  }, 
  searchCourse : async(req,res)=>{
    console.log(req.body.q)
    const courseDetails = await CourseModel.find({ $text:{$search:req.body.q}});
    console.log(courseDetails)
    res.send(courseDetails)
  },

  chatBot : async(req,res)=>{

    response = await bot(req.body.text)
    res.send(response);
  },
  submitQuiz : async(req,res)=>{
    reqData = req.body;
    console.log(reqData)
    res.send(reqData)
  }
};



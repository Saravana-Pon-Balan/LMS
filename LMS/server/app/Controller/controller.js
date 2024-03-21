const Models = require("../models");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const mongoose  = require("mongoose");
const Axios = require("axios"); 


const UserModel = Models.userModel;
const CourseModel = Models.courseModel;
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
      console.log("User saved");
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
      console.log(userInfo)
      res.send(userInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while searching for user.");
    }
  },
  createCourse: async (req, res) => {
    const { title, description } = req.body;
    const thumbnail = req.file.path; 
    console.log(thumbnail)
    try {
      const courseObj = new CourseModel({
        title: title,
        description: description,
        thumbnail: thumbnail
      });
      await courseObj.save();
      console.log("Course saved");
      const courseId = courseObj._id;
      console.log(courseObj);
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

      console.log(course);

      res.status(200).send("Directory added successfully");
    } catch (error) {
      console.error("Error adding directory:", error);
      res.status(500).send("An error occurred while adding directory");
    }
  },
  addFile: async (req, res) => {
    try {
      const { courseId, name, caption, quiz } = req.body;
      const mediaPath = req.file ? req.file.path : null;
      if (!mediaPath) {
        return res.status(400).send('No file uploaded');
      }
      const course = await CourseModel.findOne({ _id: courseId });

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
            question: quiz.question,
            correct_option: quiz.correctOption,
            options: quiz.options
          }]
        });
      } else {
        course.contents[0].files.push({
          file_name: name,
          media_path: mediaPath,
          caption: caption,
          quizes: [{
            question: quiz.question,
            correct_option: quiz.correctOption,
            options: quiz.options
          }]
        });
      }

      await course.save();

      console.log(course);

      res.status(200).send("File added successfully");
    } catch (error) {
      console.error("Error adding file:", error);
      res.status(500).send("An error occurred while adding file");
    }
  },

  uploadFiles: upload.single("media"),

  courseList: async (req, res) => {
    try {
      const courseObj = await CourseModel.find();
      const listOfCourse = courseObj.map(element => ({
        id: element._id,
        title: element.title,
        description: element.description,
        picture: element.picture
      }));
      res.send(listOfCourse);
    } catch (error) {
      console.error("Error retrieving course list:", error);
      res.status(500).send("An error occurred while retrieving course list");
    }
  },

  addPost : async(req,res)=>{
    try {
      const { courseId, name, cp, quiz } = req.body;
      const mediaPath = req.file ? req.file.path : null;
      if (!mediaPath) {
        return res.status(400).send('No file uploaded');
      }
      const course = await CourseModel.findOne({ _id: courseId });

      if (!course) {
        return res.status(404).send("Course not found");
      }

      const n = course.contents.length;
      if (n > 0) {
        course.contents[n - 1].files.push({
          file_name: name,
          media_path: mediaPath,
          caption: cp,
          quizes: [{
            question: quiz.question,
            correct_option: quiz.correctOption,
            options: quiz.options
          }]
        });
      } else {
        course.contents[0].files.push({
          file_name: name,
          media_path: mediaPath,
          caption: cp,
          quizes: [{
            question: quiz.question,
            correct_option: quiz.correctOption,
            options: quiz.options
          }]
        });
      }

      await course.save();

      console.log(course);

      res.status(200).send("File added successfully");
    } catch (error) {
      console.error("Error adding file:", error);
      res.status(500).send("An error occurred while adding file");
    }
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

  getCourseContent: async (req, res) => {
    try {
      const courseId = req.params.id;
      console.log(courseId)
      const course = await CourseModel.findById(courseId);
      console.log(course);
      if (!course) {
        console.log(course);
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
    console.log(code+language)
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
            'X-RapidAPI-Key': '3277b3985emsh71e2c380be2c266p1b51e3jsnddb1b15e9dd7',
            'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
        }, 
        data: data 
    }; 
    Axios(config) 
        .then((response) => { 
            res.send(response.data) 
            console.log(response.data) 
        }).catch((error) => { 
            console.log(error); 
        }); 
  },
  saveCode :(req,res)=>{
      console.log("hi");
  }
};

const Models = require("../models");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const mongoose  = require("mongoose");
const Axios = require("axios"); 
const { log } = require("console");


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
            'X-RapidAPI-Key': '3277b3985emsh71e2c380be2c266p1b51e3jsnddb1b15e9dd7',
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
      // Check if the course exists
      const course = await CourseModel.findById(requestData.courseId);
      if (!course) {
        // If the course doesn't exist, return an error response
        return res.status(404).send("Course not found");
      }
  
      // Check if the user is already enrolled in the course
      const enrollment = await EnrollModel.findOne({
        courseId: requestData.courseId,
        userId: requestData.userId // Assuming you have userId in requestData
      });
  
      if (!enrollment) {
        // If the user is not enrolled, create a new enrollment
        const newEnrollment = new EnrollModel({
          courseId: requestData.courseId,
          userId: requestData.userId // Assuming you have userId in requestData
        });
        await newEnrollment.save();
        console.log("Enrollment saved");
        return res.send("Enrollment saved");
      } else {
        // If the user is already enrolled, return a message indicating so
        console.log("User already enrolled in the course");
        return res.send("User already enrolled in the course");
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
  
      
  
  getEnrolledCourse: async (req, res) => {
    try {
        const requestData = req.body.email;
        console.log(requestData);
        
        const enrolledCourses = await EnrollModel.find({ email: requestData });

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
    const courseDetails = await CourseModel.findOne({ creator: req.email });
    console.log()
    res.send(courseDetails);
  }

};



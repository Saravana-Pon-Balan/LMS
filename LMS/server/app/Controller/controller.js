const Models = require("../models");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const UserModel = Models.userModel;
const CourseModel = Models.courseModel;
const CodeModel = Models.codeModel;



const storage = multer.diskStorage({
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

const upload = multer({ storage: storage });


module.exports = {
  createUser: async (req, res) => {
    const requestData = req.body;
    try {
      const userObj = new UserModel(requestData);
      await userObj.saveData();
      console.log("User saved");
      res.send("User saved");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while saving user.");
    }
  },
  searchUser: async (req, res) => {
    const requestData = req.body;
    try {
      const userInfo = await UserModel.find({ name: requestData.name });
      res.send(userInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while searching for user.");
    }
  },
  createCourse: async (req, res) => {
    const { title, description, creator } = req.body;
    try {
      const courseObj = new Models.courseModel(req.body);
      await courseObj.saveData();
      console.log("Course saved");
      const courseId = courseObj._id;
      console.log(courseId);
      res.status(200).send(courseId);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while saving course.");
    }

    console.log(title, description);

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
      const { courseId, name, cp } = req.body;
      const mediaPath = req.file ? req.file.path : null; // Get the path of the uploaded file if it exists
      if (!mediaPath) {
        return res.status(400).send('No file uploaded');
      }
      const course = await CourseModel.findOne({ _id: courseId });

      if (!course) {
        return res.status(404).send("Course not found");
      }
    
      n = course.contents.length;
      course.contents[n-1].files.push({ 
        file_name: name,
        media_path: mediaPath, // Save the path of the uploaded file
        caption: cp
      });

      await course.save();

      console.log(course);

      res.status(200).send("File added successfully");
    } catch (error) {
      console.error("Error adding file:", error);
      res.status(500).send("An error occurred while adding file");
    }
  },

  uploadFiles: upload.single("media")
};

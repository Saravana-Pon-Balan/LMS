const Models = require("../models");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const UserModel = Models.userModel;
const CourseModel = Models.courseModel;
const CodeModel = Models.codeModel;


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const destinationDir = path.join(__dirname, 'app', 'Course');
    // Ensure the destination directory exists, if not create it
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }
    cb(null, destinationDir);
  },
  filename: function(req, file, cb) {
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
    const { title, description, creator, contents } = req.body;
    
    // Files are stored in req.files array if multer middleware is used correctly
    console.log(req.files);

    // Here you can save the course data along with the file details to your database
    res.send("done");
  },

  // Middleware to handle file uploads
  uploadFiles: upload.array('files', 10) // 'files' is the name attribute of your file input field
};


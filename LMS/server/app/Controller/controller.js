const Models = require("../models");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const mongoose = require("mongoose");
const Axios = require("axios");
const bot = require("../chatbot/index");
require('dotenv').config()
const SaveToSheet = require('../chatbot/savetosheet');
const recommend = require('collaborative-filter');



const UserModel = Models.userModel;
const CourseModel = Models.courseModel;
const EnrollModel = Models.courseEnrollModel;
const CodeModel = Models.codeModel;
const PostModel = Models.postModel;
const ChatModel = Models.ChatModel;

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
      const userInfo = await UserModel.findOne({ email: requestData.email });
        res.send({userData:userInfo.email});
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred while searching for user.");
    }
  },
  createCourse: async (req, res) => {
    const { title, description, email } = req.body;
    console.log(email)
    const thumbnail = req.file.path;
    try {
      const courseObj = new CourseModel({
        title: title,
        description: description,
        thumbnail: thumbnail,
        creator: email,
      });
      await courseObj.save();
      const courseId = courseObj._id;
      SaveToSheet(title, description, email, courseId);
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
        const updateData = {
          "contents.$[outer].files.$[inner].file_name": name,
          "contents.$[outer].files.$[inner].caption": caption,
          "contents.$[outer].files.$[inner].quizes": JSON.parse(quizQuestions)
      };

      // Include media_path only if a new file is uploaded
      if (mediaPath !== null) {
          updateData["contents.$[outer].files.$[inner].media_path"] = mediaPath;
      } 
        course = await CourseModel.findOneAndUpdate(
          { _id: courseId },
          { $set: updateData },
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
        console.log(course)
        await course.save();
        res.send("File saved")

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
      const id = req.params.id !== undefined ? req.params.id : null;
      if (id !== null && id !== 'undefined') {
        const courseObj = await CourseModel.findById(id);
        const listOfCourse = [{
          id: courseObj._id,
          title: courseObj.title,
          description: courseObj.description,
          picture: courseObj.thumbnail,
          creator: courseObj.creator,

        }];
        res.send(listOfCourse);
      }
      else {
        const courseObj = await CourseModel.find();
        console.log(courseObj)

        const listOfCourse = courseObj.map(element => ({
          id: element._id,
          title: element.title,
          description: element.description,
          picture: element.thumbnail,
          creator: element.creator,
        }));
        res.send(listOfCourse);
      }
    } catch (error) {
      console.error("Error retrieving course list:", error);
      res.status(500).send("An error occurred while retrieving course list");
    }
  },

  addPost: async (req, res) => {
    const { author, content } = req.body;
    const mediaPath = req.file ? req.file.path : null;
    const postObj = new PostModel({ userId: author, postContent: content, postMedia: mediaPath });
    postObj.save();

    const filename = postObj.postMedia.split('/').pop(); // Extract filename from the path
    const mediaURL = `http://localhost:3001/${filename}`; // Construct the URL
    let updatedPostObj = { ...postObj.toObject(), mediaURL }; // Use let instead of const

    res.send(updatedPostObj);
  },


  getPost: async (req, res) => {
    try {
      const posts = await PostModel.find();

      // Extract filename from postMedia path and construct the URL
      const postsWithMediaURL = posts.map(post => {
        const filename = post.postMedia.split('/').pop(); // Extract filename from the path
        const mediaURL = `http://localhost:3001/${filename}`; // Construct the URL
        return { ...post.toObject(), mediaURL }; // Add mediaURL to the post object
      });

      console.log(postsWithMediaURL);
      res.send(postsWithMediaURL);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
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
  getCourseData: async (req, res) => {
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

  compiler: async (req, res) => {
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
  saveCode: async (req, res) => {
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

      const enrollmentContents = [];


      course.contents.forEach(directory => {
          const existingDirectoryIndex = enrollmentContents.findIndex(item => item.dir_id === directory._id.toString());
          if (existingDirectoryIndex !== -1) {
              directory.files.forEach(file => {
                  const existingFileIndex = enrollmentContents[existingDirectoryIndex].files.findIndex(item => item.file_id === file._id.toString());
                  if (existingFileIndex === -1) {
                      enrollmentContents[existingDirectoryIndex].files.push({
                          file_id: file._id.toString(),
                          quizes: file.quizes.map(quiz => ({
                              quiz_id: quiz._id.toString(),
                              correctOption: quiz.correctOption.toString()
                          })),
                          marks: 0, 
                          viewed: false 
                      });
                  }
              });
          } else {
              // Directory not found, add it along with its files
              const newDirectory = {
                  dir_id: directory._id.toString(),
                  files: []
              };
              directory.files.forEach(file => {
                  newDirectory.files.push({
                      file_id: file._id.toString(),
                      quizes: file.quizes.map(quiz => ({
                          quiz_id: quiz._id.toString(),
                          correctOption: quiz.correctOption.toString()
                      })),
                      marks: 0, 
                      viewed: false 
                  });
              });
              enrollmentContents.push(newDirectory);
          }
      });
      
      console.log("enrollmentContents", enrollmentContents);
      

    



      const enrollment = await EnrollModel.findOne({
        courseId: requestData.courseId,
        email: requestData.email
      });

      if (!enrollment) {
        console.log("enrollmentContents",enrollmentContents)
        const newEnrollment = new EnrollModel({
          courseId: requestData.courseId,
          contents: enrollmentContents,
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

      const enrolledCourses = await EnrollModel.find({ email: requestData });
      const response = await Promise.all(enrolledCourses.map(async course => {
        const courseDetails = await CourseModel.findOne({ _id: course.courseId });

        return {
          id: courseDetails._id,
          title: courseDetails.title,
          description: courseDetails.description,
          picture:courseDetails.thumbnail
        };
      }));
      res.send(response);
    } catch (error) {
      console.error("Error retrieving enrolled courses:", error);
      res.status(500).send("Internal server error");
    }
  },
  getViewStatus: async (req, res) => {
    const { cid, uid } = req.body;
    const enrolledData = await EnrollModel.findOne({ courseId: cid, email: uid });
    console.log(enrolledData)
    res.send(enrolledData)
  },

  getOwnCourse: async (req, res) => {
    const courseDetails = await CourseModel.find({ creator: req.body.email });
    console.log(courseDetails)
    res.send(courseDetails);
  },
  getCourseTitles: async (req, res) => {
    const courseDetails = await CourseModel.find();
    titleData = []
    courseDetails.forEach((course) => {
      titleData.push({ id: course._id, title: course.title });
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
      res.json({ file, dir_id: dirId });
    } catch (error) {
      console.error('Error finding file details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }


  },
  searchCourse: async (req, res) => {
    console.log(req.body.q)
    const courseDetails = await CourseModel.find({ $text: { $search: req.body.q } });
    console.log(courseDetails)
    res.send(courseDetails)
  },

  chatBot: async (req, res) => {

    response = await bot(req.body.text)
    res.send(response);
  },
  submitQuiz: async (req, res) => {
    const { user_id, answers, course_id, file_id } = req.body;

    try {
        // Find the enrolled course based on course_id and user_id
        const enrolledCourse = await EnrollModel.findOne({ courseId: course_id, email: user_id });

        if (!enrolledCourse) {
            return res.status(404).json({ message: 'Enrolled course not found.' });
        }

        const contentIndex = enrolledCourse.contents.findIndex(content => content.files.some(file => file.file_id === file_id));
        if (contentIndex === -1) {
            return res.status(404).json({ message: 'File not found in enrolled course contents.' });
        }

        const fileIndex = enrolledCourse.contents[contentIndex].files.findIndex(file => file.file_id === file_id);

        // Retrieve correct options for the quizzes in the file
        const correctOptions = enrolledCourse.contents[contentIndex].files[fileIndex].quizes.map(quiz => ({ q_id: quiz.quiz_id, CO: quiz.correctOption }));
        console.log("525",correctOptions)
        // Calculate marks
        let totalQuestions = correctOptions.length;
        let correctAnswers = 0;

        answers.forEach(answer => {
            const { questionId, selectedOptionIndex } = answer;
            const correctOptionIndex = correctOptions.findIndex(option => option.q_id === questionId);
            if (correctOptionIndex !== -1 && correctOptionIndex+1 === selectedOptionIndex) {
                correctAnswers++;
            }
        });
        console.log("537",correctAnswers)
        console.log("538",totalQuestions)
        const marks = (correctAnswers / totalQuestions) * 100;

        if (isNaN(marks)) {
            return res.status(400).json({ message: 'Invalid quiz answers provided.' });
        }

        // Update marks and viewed status
        enrolledCourse.contents[contentIndex].files[fileIndex].marks = marks;
        enrolledCourse.contents[contentIndex].files[fileIndex].viewed = true;

        // Save the updated enrolled course back to the database
        await enrolledCourse.save();

        return res.status(200).json({ message: 'Quiz submitted successfully.', marks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
},
  setComment: async (req, res) => {
    try {
      const { cid, uid, dir_id, file_id, text } = req.body;
      // Find the course document
      const user = await UserModel.findOne({ email: uid });
      const name = user.name;
      console.log(name)
      const course = await CourseModel.findById(cid);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Find the directory within contents array
      const directory = course.contents.find(dir => dir._id.toString() === dir_id);
      if (!directory) {
        return res.status(404).json({ error: "Directory not found" });
      }

      // Find the file within files array
      const file = directory.files.find(f => f._id.toString() === file_id);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      // Push the new comment to the discussion array of the file
      file.discussion.push({ user_name: name, comment: text });

      // Save the updated course document
      await course.save();

      res.send(file.discussion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserPost: async (req, res) => {
    uid = req.body.uid;
    console.log(uid)
    const posts = await PostModel.find({ userId: uid })
    const postsWithMediaURL = posts.map(post => {
      const filename = post.postMedia.split('/').pop(); // Extract filename from the path
      const mediaURL = `http://localhost:3001/${filename}`; // Construct the URL
      return { ...post.toObject(), mediaURL }; // Add mediaURL to the post object
    });

    console.log(postsWithMediaURL);
    res.send(postsWithMediaURL);
  },

  getPostData: async (req, res) => {
    pid = req.params.id;
    console.log(pid)
    const postObj = await PostModel.findById(pid)
    const filename = postObj.postMedia.split('/').pop();
    const mediaURL = `http://localhost:3001/${filename}`;
    let updatedPostObj = { ...postObj.toObject(), mediaURL };
    res.send(updatedPostObj);


  },
  getUserData: async (req, res) => {
    const email = req.body.uid;
    const user = await UserModel.findOne({ email: email });

    // Get the length of followers and following arrays
    const followersCount = user.followers.length;
    const followingCount = user.following.length;

    // Construct the response object with user data and counts
    const userDataWithCounts = {
      user: user,
      followersCount: followersCount,
      followingCount: followingCount
    };

    res.send(userDataWithCounts);
  },
  setUserData: async (req, res) => {
    const { id, name, bio, city } = req.body;
    const user = await UserModel.findOneAndUpdate(
      { email: id }, // Assuming id is the ID of the user you want to update
      { name: name, bio: bio, city: city },
      { new: true } // To return the updated document
    );
    res.send(user)
  },
  searchChatUser: async (req, res) => {
    const uname = req.params.name;
    console.log(uname)
    const users = await UserModel.find({ name: { $regex: uname, $options: 'i' } });
    res.send(users)
  },
  sendMessage: async (req, res) => {
    try {
      const { sender, receiver, text } = req.body;
      const sender_user = await UserModel.findOne({ email: sender })
      const sender_name = sender_user.name

      let chatObj = await ChatModel.findOne({ members: { $all: [sender_name, receiver] } });
      if (!chatObj) {
        chatObj = await ChatModel.create({ members: [sender_name, receiver], messages: [{ sender, message: text }] });
      } else {
        // Add message to the chat object
        chatObj.messages.push({ sender, message: text });
        // Save the chat object
        await chatObj.save();
      }

      // Return success response
      res.status(200).json({ message: 'Message sent successfully', chat: chatObj });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  listUserData: async (req, res) => {
    try {
      const emailId = req.params.emailId;
      const user = await UserModel.findOne({ email: emailId });
      const uname = user.name
      const chatRooms = await ChatModel.find({ members: uname });
      if (!chatRooms) {
        return res.status(404).json({ message: "No chat rooms found for the user." });
      }

      const otherUserNames = chatRooms.map(room => {
        const otherMembers = room.members.filter(member => member !== uname); // Exclude the user's own email ID
        return otherMembers;
      });
      response = []
      otherUserNames.forEach((user, i) => {
        response.push({
          id: chatRooms[i]._id,
          name: user[0],
        })

      });
      res.send(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  getMessage: async (req, res) => {
    const id = req.params.id;
    const chatData = await ChatModel.findById(id);
    const response = chatData.messages
    res.send(response)
  },
  getRecommendation: async (req, res) => {
    // Assuming you have access to your UserModel and CourseModel
    // Fetch all users

    console.log("recommending ...")
    let enrollmentList;
    let users;
    let courses;
    try {
      // Fetch all emails from UserModel
      const userEmails = await UserModel.find({}, 'email');
      users = userEmails.map(user => user.email);
      console.log(users)
      // Fetch all course _ids from CourseModel
      const courseIds = await CourseModel.find({}, '_id');
      courses = courseIds.map(course => course._id.toString());

      // Initialize enrollmentList with zeros
      enrollmentList = Array.from({ length: users.length }, () => Array.from({ length: courses.length }, () => 0));

      // Fetch courseId and email from EnrollModel
      const enrollments = await EnrollModel.find({}, 'courseId email');

      // Update enrollmentList based on enrollments
      enrollments.forEach(enrollment => {
        const { courseId, email } = enrollment;
        const userIndex = users.indexOf(email);
        const courseIndex = courses.indexOf(courseId);

        if (userIndex !== -1 && courseIndex !== -1) {
          enrollmentList[userIndex][courseIndex] = 1;
        }
      });

      // Output the enrollment list
      console.log("Enrollment List:", enrollmentList);
    } catch (err) {
      console.error("Error:", err);
    }
    const userEmail = req.body.email;
    const userIndex = users.indexOf(userEmail);
    const coMatrix = recommend.coMatrix(enrollmentList, enrollmentList.length, enrollmentList[0].length);
    const result = recommend.getRecommendations(enrollmentList, coMatrix, userIndex)
    console.log(result)
    const recommended = result.map((val) => {
      if (val !== -1) {
        return courses[val]
      }
    })
    console.log(recommended);
    // Use Promise.all to wait for all promises to resolve
    Promise.all(recommended.map(async (id) => {
      if(id !== 'undefined'){
      // Wait for CourseModel.findById to resolve
      const courseObj = await CourseModel.findById(id);
      // Return the mapped object
      return {
        id: courseObj._id,
        title: courseObj.title,
        description: courseObj.description,
        picture: courseObj.thumbnail,
        creator: courseObj.creator,
      };
    }   
    }))
      .then(response => {
        // Once all promises are resolved, log the response
        console.log(response);
        res.send(response)

      })
      .catch(err => {
        // If any promise rejects, log the error
        console.error("Error:", err);
      });

  }

};



const Controller = require("./app/Controller/controller");
const router = (app) =>{

    app.post('/create_user',Controller.createUser);
    app.post('/search_user',Controller.searchUser);
    app.post('/upload_course',Controller.uploadFiles,Controller.createCourse);
    app.post('/add_directory',Controller.addDirectory);
    app.post('/add_file',Controller.uploadFiles,Controller.addFile);
    app.post('/getCourseDetails',Controller.getCourseDetails);
    app.get('/course_content/:id', Controller.getCourseContent);
    app.post('/set_course_enroll', Controller.setCourseEnroll);
    app.post('/get_my_course', Controller.getEnrolledCourse);
    app.post('/get_my_own_course', Controller.getOwnCourse);
    app.get('/get_course_title',Controller.getCourseTitles);
    app.post('/search_course',Controller.searchCourse);
    app.get('/get_course_data/:id',Controller.getCourseData);
    app.post('/get_file_data',Controller.getFileData);
    app.post('/submit_quiz',Controller.submitQuiz);
    app.post('/compile',Controller.compiler);
    app.post('/save_code',Controller.saveCode);
    app.post('/get_view_status',Controller.getViewStatus);
    app.post('/set_comment',Controller.setComment);
    app.post('/chatbot',Controller.chatBot);

    app.post('/upload_posts',Controller.uploadFiles,Controller.addPost);
    app.get('/get_post',Controller.getPost);
    app.get('/get_post_data/:id',Controller.getPostData);
    app.post('/get_user_post',Controller.getUserPost);
    app.post('/get_user_data',Controller.getUserData);
    app.post('/set_user_data',Controller.setUserData);

    app.get('/search_chat_user/:name',Controller.searchChatUser);

    app.get('/:id?',Controller.courseList);


};

module.exports = router;
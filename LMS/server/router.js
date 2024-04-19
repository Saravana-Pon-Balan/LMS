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

    app.post('/compile',Controller.compiler);
    app.post('/save_code',Controller.saveCode);

    app.post('/chatbot',Controller.chatBot);

    app.post('/add_posts',Controller.addPost);
    app.get('/',Controller.courseList);
    

};

module.exports = router;
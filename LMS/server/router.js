const Controller = require("./app/Controller/controller");
const router = (app) =>{

    app.post('/create_user',Controller.createUser);
    app.post('/search_user',Controller.searchUser);
    app.post('/upload_course', Controller.uploadFiles,Controller.createCourse);
    app.post('/add_directory',Controller.addDirectory);
    app.post('/add_file',Controller.uploadFiles,Controller.addFile);
    app.get('/',Controller.courseList);
    

};

module.exports = router;
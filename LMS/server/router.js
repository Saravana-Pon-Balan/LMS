const Controller = require("./app/Controller/controller");
const router = (app) =>{

    app.post('/',Controller.createUser);
    app.get('/search-user',Controller.searchUser);
    app.post('/upload-course', Controller.uploadFiles,Controller.createCourse);

};

module.exports = router;
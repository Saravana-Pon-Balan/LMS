const Controller = require("./app/Controller/controller");
const router = (app) =>{

    app.post('/',Controller.createUser);
    app.get('/searchuser',Controller.searchUser);
};

module.exports = router;
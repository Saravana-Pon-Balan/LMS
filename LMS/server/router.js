const Controller = require("./app/Controller/controller");
const router = (app) =>{
    app.get('/',(req,res) => {
        
        console.log();
        res.send("hello")
        
    })
    app.post('/',Controller.createUser)
};

module.exports = router;
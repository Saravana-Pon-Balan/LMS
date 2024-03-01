const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require('cors');

const configureExpressApp = (app) =>{
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(compression(9));
    app.use(cors());
};

module.exports = configureExpressApp;
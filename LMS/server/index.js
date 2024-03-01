const express = require('express'); 
const configureExpressApp = require("./conf/serverConf");
const router = require("./router");
const dbconn = require("./dbconn");
const app = express(); 
const PORT = 3001; 
configureExpressApp(app)

dbconn()
.then(async(db) => {
  app.listen(PORT);
  console.log(`Server started on Port ${PORT}`);
  router(app);


}).catch((error) => console.error(`Unable to start the server`, error));
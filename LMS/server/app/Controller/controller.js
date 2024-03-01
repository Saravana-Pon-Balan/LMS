const Models = require("../models")
const UserModel = Models.UserModel;
const Course = Models.Course;
const Code = Models.Code;

module.exports = {
    createUser: async (req, res) => {
      const requestData = req.body;
      console.log(requestData);
      const userObj = new UserModel(requestData);
      await userObj.saveData();
      console.log("saved");
      res.send("saved")
    },
    searchUser:async(req,res) => {
      const requestData = req.body;
      const userInfo = new UserModel.find(requestData);
      res.send(userInfo)
    }

}

const UserModel = require("../models")
module.exports = {
    createUser: async (req, res) => {
      const requestData = req.body
      console.log(requestData)
      const userObj = new UserModel(requestData);
      await userObj.saveData();
      console.log("saved");
      res.send("saved")
    }
}
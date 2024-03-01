const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    profilePic: { type: String, default: '' },
})

UserModel.method({
    saveData: async function () {
        return this.save()
    }
})

module.exports = mongoose.model('userData', UserModel)
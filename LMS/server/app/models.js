const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, unique:true, required:true },
    profilePic: { type: String, default: '' },
});

userSchema.method({
    saveData: async function () {
        return this.save();
    }
});

const courseSchema = new Schema(
    {
        title : {type:String, required:true},
        description : {type:String},
        creator : {type:String},
        contents : [
            {
                dir_name: {type:String},
                files : [
                    {
                        file_name:{type:String},
                        path:{type:String},
                        discussion : [
                            {
                                user_name:{type:String},
                                comment:{type:String}
                            }
                        ]
                    }
                ]
            }
        ]
    }
);

const codeSchema = new Schema({
    userId: { type:String},
    file : {
        file_name:{type:String},
        path:{type:String},
        file_type:{type:String},
        created_at: {type: Date, default: Date.now }
    }
});

const Models = {
    userModel: mongoose.model('UserData', userSchema),
    courseModel: mongoose.model('CourseData', courseSchema),
    codeModel: mongoose.model('CodeData', codeSchema)
};

module.exports = Models;

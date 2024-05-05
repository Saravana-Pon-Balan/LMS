const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, unique:true, required:true },
    password:{type:String,default:''},
    profilePic: { type: String, default: '' },
    bio:{type:String, default: ''},
    city:{type:String},
    followers:[],
    following:[],
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
        thumbnail:{type:String },
        creator : {type:String},
        contents : [
            {
                dir_name: {type:String},
                files : [
                    {
                        file_name:{type:String},
                        media_path:{type:String},
                        caption:{type:String},
                        quizes:[
                            {
                            question:{type:String},
                            correct_option:{type:String},
                            options:[ ]
                            }
                        ],
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
courseSchema.method({
    saveData: async function () {
        return this.save();
    }
});

const codeSchema = new Schema({
    userId: { type:String},
    file_name:{type:String},
    language:{type:String},
    code : {type:String},
    created_at: {type: Date, default: Date.now }

});
codeSchema.method({
    saveData: async function () {
        return this.save();
    }
});
const postSchema = new Schema({
    userId : {type:String,default:""},
    postContent : {type:String},
    postMedia: {type:String},
    like: [],
    comments :[
        {
            userId:{type:String},
            comment:{type:String}
        },
    ],
});
postSchema.method({
    saveData: async function () {
        return this.save();
    }
});
const courseEnrollSchema = new Schema({
    courseId : {type:String},
    contents:[
        {
            dir_id:{type:String},
            files:[
                {
                file_id:{type:String},
                marks:{type:Number},
                viewed:{type:Boolean},
                }
            ]
        }
    ],
    email : {type:String}
});
courseEnrollSchema.method({
    saveData: async function () {
        return this.save();
    }
});

const chatSchema = new Schema(
    {
        members: [{ type: String }],
        messages: [
            {
                sender: { type: String },
                message: { type: String },
                createdAt: { type: Date, default: Date.now } // Add createdAt field for each message
            }
        ],
    }
);


const Models = {
    userModel: mongoose.model('UserData', userSchema),
    courseModel: mongoose.model('CourseData', courseSchema),
    codeModel: mongoose.model('CodeData', codeSchema),
    postModel:mongoose.model('PostData',postSchema),
    courseEnrollModel:mongoose.model('enrollData',courseEnrollSchema),
    ChatModel:mongoose.model('chatData',chatSchema),


};

module.exports = Models;

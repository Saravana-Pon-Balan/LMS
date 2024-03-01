const mongoose = require('mongoose');
const schema = mongoose.Schema;
const UserModel = new schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    profilePic: { type: String, default: '' },
});

UserModel.method({
    saveData: async function () {
        return this.save()
    }
});


const Course = new schema(
    {
        titile : {type:String,required:true},
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

const Code = schema({
    userId: { type:String},
    file : {
        file_name:{type:String},
        path:{type:String},
        file_type:{type:String},
        created_at: {type: Date, default: Date.now }

    }
})
const Models = {
     UserModel : mongoose.model('UserData', UserModel),
     Course : mongoose.model('Course',Course),
     Code : mongoose.model('Code',Code)


};
module.exports = Models;
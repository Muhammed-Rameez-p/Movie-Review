const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type: String, required : true},
    email:{type: String, required : true},
    password:{type: String, required : true},
    id:{type : String},
    selectedFile: String,
    selectedFile2: String,
    about:{
        type:String,
        trim:true,
    },
    location:{
        type:String,
        trim:true,
    },
    followers:{type:[String], default: []},
    role:{type:String,
        default:'user',
        enum:['admin','user'],
    }
})


module.exports = mongoose.model("User", userSchema);

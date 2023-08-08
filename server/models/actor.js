const mongoose = require("mongoose");

const actorSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    about:{
        type:String,
        trim:true,
        required:true,
    },
    gender:{
        type:String,
        trim:true,
        required:true
},
selectedFile: String,

}, {timestamps: true});

actorSchema.index({name: "text" });



module.exports = mongoose.model("Actor", actorSchema);
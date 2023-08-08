const mongoose = require("mongoose");


const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    storyLine: {
      type: String,
      trim: true,
      required: true,
    },

    comments:{type:[String], default: []},
    likes:{type:[String], default: []},
    ratings: [
      {
        id: String,
        rating: Number
      }
    ],
   
    tags: {
      type: [String],
      required: true,
    },
    selectedFile: String,

    
  

    // likeCount:{
    //     type:Number,
    //     default:0
    // }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
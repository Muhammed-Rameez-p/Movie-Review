 const { isValidObjectId } = require('mongoose');
const Movie = require('../models/movie')

 exports.getMovie = async (req,res) =>{
    try { 
       const NewMovie = await Movie.find();

       res.status(200).json(NewMovie);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.getMovieSearch = async (req,res) =>{
    const searchQuery = req.query.searchQuery;

    try { 
      const title = new RegExp(searchQuery, 'i');

       const NewMovie = await Movie.find({title});

       res.status(200).json({data: NewMovie});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.creatMovie = async (req,res) =>{
   const body = req.body;

   const NewMovie = new Movie(body);
    try {
       await NewMovie.save();

       res.status(200).json(NewMovie);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.getSingleMovie = async (req,res) =>{
    const { id } = req.params;

    try { 
       const NewSingleMovie = await Movie.findById(id);

       res.status(200).json(NewSingleMovie);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.commentMovie = async (req,res) =>{
    const { id } = req.params;
    const { value } = req.body;

    try { 
       const movie = await Movie.findById(id);

       movie.comments.push(value)

       const updateMovie = await Movie.findByIdAndUpdate(id, movie, {new:true});

       res.status(200).json(updateMovie);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

// exports.likeMovie = async (req,res) =>{
//     const { id } = req.params;

//     if(!req.userId) return res.json({message: 'Unauthenticated'})

//     try { 
//        const movie = await Movie.findById(id);

//        const index = movie.likes.findIndex((id) => id === String(req.userId));

//        if(index === -1) {
//           movie.likes.push(req.userId);
//        }else{
//           movie.likes = movie.likes.filter((id) => id === String(req.userId));

//        }

//        const updateMovie = await Movie.findByIdAndUpdate(id, movie, {new:true});

//        res.status(200).json(updateMovie);
//     } catch (error) {
//         res.status(400).json({message:error.message});
//     }
// }

exports.likeMovie = async (req,res) =>{
    const { id } = req.params;
    const { value } = req.body;

    try { 
       const movie = await Movie.findById(id);

       const index = movie.likes.findIndex((id) => id === value);

       if(index === -1) {
          movie.likes.push(value);
       }else{
          movie.likes = movie.likes.filter((id) => id !== value);

       }

       const updateMovie = await Movie.findByIdAndUpdate(id, movie, {new:true});

       res.status(200).json(updateMovie);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.removeMovie = async (req, res) => {
    const { movieId } = req.params;
  
    if (!isValidObjectId(movieId)) return  res.status(400).json({error:'Invalid request'}); 
  
  
    await Movie.findByIdAndDelete(movieId);
  
    res.json({ message: "Record removed successfully." });
  };

  
  exports.updateMovie = async (req,res) => {
    const {movieId} = req.params;
    const movie = req.body

    if (!isValidObjectId(movieId)) return  res.status(400).json({error:'Invalid request'});

    const newMovie = await Movie.findByIdAndUpdate(movieId, {...movie,movieId}, {new:true});

    res.json(newMovie);
 }

 exports.getLikedMovies = async (req,res) =>{
    const { id } = req.params;


    try { 
       const totalMoviesLiked = await Movie.find({likes:id})

       res.status(200).json(totalMoviesLiked);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.createdNewMovies = async (req,res) =>{
    try { 
       const NewMovie = await Movie.find().sort({ createdAt: -1 }).limit (5);


       res.status(200).json(NewMovie);
    } catch (error) {
        res.status(400).json({message:error});
    }
}

exports.getTop5LikedMovies = async (req,res) =>{
    try { 
       const NewMovie = await Movie.aggregate([
        {
          $addFields: {
            arrayLength: { $size: "$likes" } // Replace "yourArrayField" with the actual name of your array field
          }
        },
        {
          $sort: { arrayLength: -1 } // 1 for ascending order, -1 for descending order
        },
      ])


       res.status(200).json(NewMovie);
    } catch (error) {
        res.status(400).json({message:error});
    }
}

exports.movieRating = async (req,res) =>{
    const { id } = req.params;
    const { value,rating } = req.body;

    const value2 = '64774b736bcea8581094f73e'

    try {
   

       const movie = await Movie.findById(id);

     const newRating = {
      id: value,
     rating: rating
     };

   movie.ratings.push(newRating);


        const updateMovie = await Movie.findByIdAndUpdate(id, movie, {new:true});

    console.log(updateMovie)

       res.status(200).json(updateMovie);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.getAvgRating = async (req,res) =>{
    const { id } = req.params;
    try { 
       

      const Avg_Rating = await Movie.aggregate([
          {
            $project: {
              averageRating: { $avg: "$ratings.rating" }
            }
          }
      ]);


       res.status(200).json(Avg_Rating);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.allReviews = async (req,res) =>{
    const { id } = req.params;

    try { 
       const movie = await Movie.findById(id);

       const totalReview = await Movie.aggregate([
        {
            $unwind: '$comments'
          },
          {
            $project: {
              _id: 0,
              title: 1,
              selectedFile: 1,
              comment: {
                $split: ['$comments', ': '] // Split the comments into an array using ': ' as the separator
              }
            }
          },
          {
            $match: {
              'comment.0': { $exists: true }, // Ensure that the comment array is not empty
              'comment.1': { $exists: true }  // Ensure that the comment contains the user name
            }
          },
          {
            $group: {
              _id: {
                movie: '$title',
                user: { $arrayElemAt: ['$comment', 0] } // Extract the user name from the comment array
              },
              selectedFile: { $first: '$selectedFile' },
              comments: { $push: { $arrayElemAt: ['$comment', 1] } } // Extract the comment message from the comment array
            }
          },
          {
            $sort: {
              '_id.movie': 1,
              '_id.user': 1
            }
          }
    ]);


       res.status(200).json(totalReview);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.removeReview = async (req,res) =>{
    const { id } = req.params;
    const { comment } = req.body;

    console.log(id,comment);
   

   try {

    const remove_Reviews = await Movie.findByIdAndUpdate(
      { _id: id }, // Replace 'collection' with your actual collection name
      { $pull: { comments:  { $eq: comment } } }
    );

      res.status(200).json(remove_Reviews);
   } catch (error) {
       res.status(400).json({message:error.message});
   }
}
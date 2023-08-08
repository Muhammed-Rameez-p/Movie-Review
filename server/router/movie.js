const express = require('express');
const { getMovie, creatMovie, getSingleMovie, commentMovie, likeMovie, removeMovie, updateMovie, getMovieSearch, getLikedMovies, getTop5LikedMovies, createdNewMovies, movieRating, getAvgRating, allReviews, removeReview } = require('../controllers/movie');



const router = express.Router();

router.get('/', getMovie )
router.get('/createdMovies', createdNewMovies )
router.get('/top5Liked', getTop5LikedMovies )
router.get('/search', getMovieSearch )
router.get('/:id', getSingleMovie )
router.post('/', creatMovie )
router.delete('/:movieId', removeMovie)
router.patch('/:movieId',updateMovie)
router.patch('/:id/remove-review',removeReview )


router.post('/:id/comment', commentMovie )
router.post('/:id/like', likeMovie )
router.post('/:id/rating', movieRating )
router.get('/:id/allReviews', allReviews )


router.get('/:id/likedMovies', getLikedMovies );
router.get('/:id/avg-rating', getAvgRating );

 

module.exports = router;
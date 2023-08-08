import * as api from '../api/index'

// Action Creators

export const getMovies = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts();
        dispatch({type:'FETCH_ALL', payload:data})
    } catch (error) {
        console.log(error.message)
    }

}

export const getMoviesBySearch = (searchQuery) => async (dispatch) => {
    try {
        const {data : {data}} = await api.fetchMovieBySearch(searchQuery);
        
        dispatch({type:'FETCH_ALL_SEARCH', payload:data})
    } catch (error) {
        console.log(error.message)
    }
}


export const createMovie = (movie) => async (dispatch) => {
    try {
        const {data} = await api.createMovie(movie);
        dispatch({type:'CREATE', payload:data})
    } catch (error) {
        console.log(error)
    }

}

export const getSingleMovies = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchSingleMovie(id);
        
        dispatch({type:'FETCH_ONE', payload:data})
    } catch (error) {
        console.log(error.message)
    }

}

export const getLikedMovies = (id) => async (dispatch) => {
    try {
        const {data} = await api.getLikedMovies(id);
        
        dispatch({type:'FETCH_ALL_LIKED', payload:data})
    } catch (error) {
        console.log(error.message)
    }

}

export const commentMovie = (value,id) => async (dispatch) => {
    try {
        const {data} = await api.comment(value,id);
        
         dispatch({type:'COMMENT', payload:data})

         return data.comments;
    } catch (error) {
        console.log(error.message)
    }

}

export const commentDelete = (value) => async (dispatch) => {
    try {

         dispatch({type:'DELETE-COMMENT',payload:value })
      
    } catch (error) {
        console.log(error.message)
    }

}


export const movieLike = (value,id) => async (dispatch) => {
    try {

        const {data} = await api.likeMovie(value,id);

        console.log(data, 'likeeeeeeeeeee')

         dispatch({type:'LIKE',payload: data })

         return data.likes;

    } catch (error) {
        console.log(error)
    }

}

export const deleteMovie = (movieId) => async (dispatch) => {
    try {
         await api.deleteMovie(movieId);

        dispatch({type:'DELETE-MOVIE', payload:movieId})
        
    } catch (error) {
        console.log(error)
    }

}

export const updateMovie = (movieId, movie) => async (dispatch) => {
    try {
      const { data } =  await api.updateMovie(movieId, movie);

        dispatch({type:'UPDATE-MOVIE', payload:data})
        
    } catch (error) {
        console.log(error)
    }

}

export const createdNewMovies = () => async (dispatch) => {
    try {
        const {data} = await api.fetchCreatedNewMovies();
       
        dispatch({type:'TOP_5', payload:data})
    } catch (error) {
        console.log(error)
    }

}

export const getTop5LikedMovies = () => async (dispatch) => {
    try {
        const {data} = await api.fetchTop5Liked();
        dispatch({type:'TOP_5_LIKED', payload:data})
    } catch (error) {
        console.log(error)
    }

}

export const movieRating = (value,id,rating) => async (dispatch) => {
    try {

        const {data} = await api.ratingMovie(value,id,rating);

        console.log(data, 'ratinggggggggggggggggg')

         dispatch({type:'RATING',payload: data })

        //  return data.ratings;

    } catch (error) {
        console.log(error)
    }

}

export const getAvgRating = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchAvgRating(id);

        console.log(data);
        
         dispatch({type:'AVG_RATING', payload:data})
    } catch (error) {
        console.log(error.message)
    }

}

export const getTotalReviews = (id) => async (dispatch) => {
    try {
        const {data} = await api.getAllReviews(id);
        
         dispatch({type:'FETCH_ALL_REVIEW', payload:data})
    } catch (error) {
        console.log(error.message)
    }

}

export const deleteReview = (id,comment) => async (dispatch) => {
    try {
        const {data} = await api.deleteReviews(id,comment);

        console.log(data,'removvvvvvvvvvvvvvvv')

        //  dispatch({type:'REMOVE_REVIEW', payload:data})
        
    } catch (error) {
        console.log(error)
    }

}
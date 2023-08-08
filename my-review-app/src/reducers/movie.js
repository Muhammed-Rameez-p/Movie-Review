// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {movie : []}, action) => {
      switch (action.type) {
        case 'FETCH_ALL':
           return {...state, movie: action.payload};
           case 'FETCH_ALL_LIKED':
           return {...state, movieLiked: action.payload};
           case 'FETCH_ALL_REVIEW':
           return {...state, allReview: action.payload};
           case 'FETCH_ALL_SEARCH':
           return {...state, movie: action.payload};
           case 'DELETE-MOVIE':
         return {...state, movie: state.movie.filter((actor)=>actor._id !== action.payload)} ;
           case 'FETCH_ONE':
           return { ...state, movieOne: action.payload};
           case 'UPDATE-MOVIE':
            return {...state, movie: state.movie.map((actor)=> actor._id === action.payload._id ? action.payload : actor )} ;
        case 'CREATE':
           return { ...state, movie : [...state.movie ,action.payload]};
           case 'LIKE':
            return { ...state, movieOne : action.payload};
            case 'RATING':
            return { ...state, movieOne : action.payload};
            case 'AVG_RATING':
               return { ...state, avgMovie : action.payload};
            case 'TOP_5':
            return { ...state, createdNew_Movies : action.payload};
            case 'TOP_5_LIKED':
            return { ...state, topLikedMovies : action.payload};
           case 'COMMENT':
            return {
                ...state, 
                movie : state.movie.map((movie) => {
                   if(movie._id === action.payload._id) return action.payload;

                   return movie;
                })
               };
            //    case 'DELETE-COMMENT':
            // return {
            //     ...state, 
            //     movie : state.movie.filter((movie,index) => index !== action.payload )
            //    };
        default:
            return state;
      }
}

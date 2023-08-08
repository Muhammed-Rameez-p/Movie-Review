// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {user : []}, action) => {
    switch (action.type) {
      case 'FETCH_ONE_USER':
        return { ...state, userOne: action.payload};
        case 'FETCH_ALL_USERS':
        return { ...state, userAll: action.payload};
        case 'FETCH_ALL_FOLLOWING':
        return { ...state, followingAll: action.payload};
        case 'FOLLOW':
        return { ...state, userOne: action.payload};
        case 'UPDATE-MOVIE':
            return {...state, user: state.user.map((actor)=> actor._id === action.payload._id ? action.payload : actor )} ;
      
      default:
          return state;
    }
}

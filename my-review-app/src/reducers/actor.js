// eslint-disable-next-line import/no-anonymous-default-export
export default (actor = [], action) => {
    switch (action.type) {
      case 'UPDATE':
         return actor.map((actor)=> actor._id === action.payload._id ? action.payload : actor ) ;
      case 'DELETE':
         return actor.filter((actor)=>actor._id !== action.payload) ;
      case 'FETCH_ALL':
         return action.payload;
         case 'FETCH_ALL_ACTOR':
         return action.payload;
      case 'CREATE':
         return [...actor,action.payload];
      default:
          return actor;
    }
}

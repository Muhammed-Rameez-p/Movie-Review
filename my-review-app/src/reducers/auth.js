
const authReducer = (state = {authData : null}, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify(action?.payload));
            console.log(action?.payload,'333333333')

            return {...state, authData: action?.payload};
    
            case 'LOGOUT':
            localStorage.clear();

            return {...state, authData: null};

        default:
            return state;
    }
}

export default authReducer;

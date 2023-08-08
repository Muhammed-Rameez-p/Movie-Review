import * as api from '../api/index'


export const updateUser = (userId, updateUser) => async (dispatch) => {
    try {
      const { data } =  await api.updateUser(userId, updateUser);

        dispatch({type:'UPDATE-USER', payload:data})
        
    } catch (error) {
        console.log(error)
    }

}

export const getSingleUser = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchSingleUser(id);

        
         dispatch({type:'FETCH_ONE_USER', payload:data})
    } catch (error) {
        console.log(error.message)
    }

}

export const followUser = (value,id) => async (dispatch) => {
    try {

        const {data} = await api.userFollow(value,id);

         dispatch({type:'FOLLOW',payload: data })

         return data.likes;

    } catch (error) {
        console.log(error)
    }

}

export const getUsers = () => async (dispatch) => {
    try {
        const {data} = await api.getAllUsers();
        dispatch({type:'FETCH_ALL_USERS', payload:data})
    } catch (error) {
        console.log(error.message)
    }

}

export const getFollowing = (id) => async (dispatch) => {
    try {
        const {data} = await api.getAllFollowing(id);
        
         dispatch({type:'FETCH_ALL_FOLLOWING', payload:data})
    } catch (error) {
        console.log(error.message)
    }

}
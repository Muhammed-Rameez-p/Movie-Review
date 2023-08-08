import * as api from '../api/index'


export const getActor = () => async (dispatch) => {
    try {
        const {data} = await api.fetchActor();
        dispatch({type:'FETCH_ALL_ACTOR', payload:data})
    } catch (error) {
        console.log(error.message)
    }

}

export const getActorBySearch = (searchQuery) => async (dispatch) => {
    try {
        const {data : {data}} = await api.fetchActorBySearch(searchQuery);
        
        dispatch({type:'FETCH_ALL_ACTOR', payload:data})
    } catch (error) {
        console.log(error.message)
    }
}

export const createActor = (actor) => async (dispatch) => {
    try {
        const {data} = await api.createActor(actor);

        console.log(actor);
        dispatch({type:'CREATE', payload:data})
        
    } catch (error) {
        console.log(error)
    }

}

export const updateActor = (actorId, actor) => async (dispatch) => {
    try {
      const { data } =  await api.updateActor(actorId, actor);

        console.log(data);
        dispatch({type:'UPDATE', payload:data})
        
    } catch (error) {
        console.log(error)
    }

}

export const deleteActor = (actorId) => async (dispatch) => {
    try {
         await api.deleteActor(actorId);

        console.log(actorId);
        dispatch({type:'DELETE', payload:actorId})
        
    } catch (error) {
        console.log(error)
    }

}
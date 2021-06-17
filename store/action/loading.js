export const SET_LOADING = "SET_LOADING"


export const setLoading=(loading)=>{
    return (dispatch) =>{
        dispatch({action:SET_LOADING,payload:loading})
    }
} 
export const SET_LOADING = "SET_LOADING"


export const setLoading=(loading)=>{
    return async (dispatch) =>{
        try{
        dispatch({action:SET_LOADING,payload:loading})
        }catch(err){
            console.log(err)
        }
    }
} 
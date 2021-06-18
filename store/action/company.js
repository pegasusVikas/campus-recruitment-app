export const SET_COMPANY = "SET_COMPANY"

export const setCompany=(item)=>{
    return async dispatch =>{
        try{ 
            const data=item
            dispatch({type:SET_COMPANY,payload:data})//add a notifier
        }catch(err){
            console.log(err)
        }
    }
} 




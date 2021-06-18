import{
FETCH_PROFILE,
LOGIN, 
SIGN_UP_COMPANY,
SIGN_UP_STUDENT,
} from '../action/auth'
FETCH_PROFILE

let initial = {
   
}

export default (state=initial,action)=>{
    console.log("auth reducer",action.type)
    switch(action.type){
        case FETCH_PROFILE:
        case LOGIN:
        case SIGN_UP_COMPANY:
        case SIGN_UP_STUDENT:
            return {...action.payload}
        default:
            return state;
    }
    
}
import{
FETCH_PROFILE,
LOGIN, 
LOGOUT, 
SIGN_UP_COMPANY,
SIGN_UP_STUDENT,
} from '../action/auth'
FETCH_PROFILE

let initial = {
   
}

export default (state=initial,action)=>{
  
    switch(action.type){
        case FETCH_PROFILE:
        case LOGIN:
        case SIGN_UP_COMPANY:
        case SIGN_UP_STUDENT:
            return {...action.payload}
        case LOGOUT:
            return initial;
        default:
            return state;
    }
    
}
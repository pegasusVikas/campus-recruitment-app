import{
LOGIN, 
SIGN_UP_COMPANY,
SIGN_UP_STUDENT,
} from '../action/auth'

let initial = {
   
}

export default (state=initial,action)=>{
    console.log("auth reducer",action.type)
    switch(action.type){
        case LOGIN:
        case SIGN_UP_COMPANY:
        case SIGN_UP_STUDENT:
            console.log("prfile reducer",action.type,action.payload)
            return {...action.payload}
        default:
            return state;
    }
    
}
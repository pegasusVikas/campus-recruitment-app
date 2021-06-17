import{
    SET_LOADING
    } from '../action/loading'
    
    let initial =false
    
    export default (state=initial,action)=>{
        console.log("loading :}",action.type)
        switch(action.type){
            case SET_LOADING:
                console.log("loading")
                return action.payload
            default:
                return state;
        }
        
    }
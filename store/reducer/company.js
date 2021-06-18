import{
   SET_COMPANY
    } from '../action/company'
    
    let initial = {
       companyProfile:[]
    }
    
    export default (state=initial,action)=>{
        switch(action.type){
            case SET_COMPANY: 
                return {...state,companyProfile:{...action.payload}}
            default:
                return state;
        }
        
    }
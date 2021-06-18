import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import config from '../../config'
import setAuthToken from '../../utils/setAuthToken';
import {SET_LOADING} from './loading'

export const POST_JOB = "POST_JOB"
export const FETCH_JOB = "FETCH_JOB"
export const FETCH_JOB_ARRAY = "FETCH_JOB_ARRAY"
export const FETCH_COMPANY_JOBS = "FETCH_COMPANY_JOBS"
export const FETCH_COMPANY_TRAINING = "FETCH_COMPANY_TRAINING"
export const FETCH_COMPANY_INTERNSHIPS = "FETCH_COMPANY_INTERNSHIPS"

export const postJob=({title,salary,slots,description,deadline,type,btechPercentage,interPercentage,schoolPercentage})=>{
    return async dispatch =>{
        try{
            dispatch({type:SET_LOADING,payload:true})
            await setAuthToken();
            const {data}=await axios.post(config.url+'/api/job',{
                title,
                salary,
                slots,
                description,
                deadline,
                type,
                btechPercentage,
                interPercentage,
                schoolPercentage
            })
            dispatch({type:POST_JOB,payload:data.user})//add a notifier
            dispatch({type:SET_LOADING,payload:false})
        }catch(err){
            console.log(err)
        }
    }
} 

export const fetchJob=(_id)=>{
    return async dispatch=>{
        dispatch({type:SET_LOADING,payload:true})
        try{
            await setAuthToken();
            const {data} = await axios.get(config.url+'/api/job/'+_id);
            dispatch({type:FETCH_JOB,payload:data})
            dispatch({type:SET_LOADING,payload:false})
        }catch(err){
            console.log(err)
        }
    }
} 
export const fetchJobArray=(arr)=>{
    return async dispatch=>{
        dispatch({type:SET_LOADING,payload:true})
        try{
            await setAuthToken();
            const {data} = await axios.post(config.url+'/api/job/array',{jobs:arr});
            dispatch({type:FETCH_JOB_ARRAY,payload:data})
            dispatch({type:SET_LOADING,payload:false})
        }catch(err){
            console.log(err)
        }
    }
} 
export const getJob=(_id)=>{
    return async dispatch=>{
        dispatch({type:SET_LOADING,payload:true})
        try{
            await setAuthToken();
            const {data} =await axios.get(config.url+'/api/job/job/'+_id)
            console.log(data);
            dispatch({type:FETCH_COMPANY_JOBS,payload:data})
            dispatch({type:SET_LOADING,payload:false})
        }catch(err){
            console.log(err)
        }
       // dispatch({type:SET_LOADING,payload:false})
    }
}

export const getInternship=(_id)=>{
    return async dispatch=>{
        dispatch({type:SET_LOADING,payload:true})
        try{
            await setAuthToken();
            const {data} =await axios.get(config.url+'/api/job/internship/'+_id)
            //console.log("fetched intern",data);
            dispatch({type:FETCH_COMPANY_INTERNSHIPS,payload:data})
            dispatch({type:SET_LOADING,payload:false})
        }catch(err){
            console.log(err)
        }
    }
}

export const getTraining=(_id)=>{
    return async dispatch=>{
        dispatch({type:SET_LOADING,payload:true})
        try{
            await setAuthToken();
            const {data} =await axios.get(config.url+'/api/job/training/'+_id)
            console.log("i fetched training :)",data);
            dispatch({type:FETCH_COMPANY_TRAINING,payload:data})
            dispatch({type:SET_LOADING,payload:false})
        }catch(err){
            console.log(err)
        }
    }
}


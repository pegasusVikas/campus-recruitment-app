import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import config from '../../config'
import {SET_LOADING} from './loading'

export const LOGIN = "LOGIN"
export const SIGN_UP_COMPANY = "SIGN_UP_COMPANY"
export const SIGN_UP_STUDENT = "SIGN_UP_STUDENT"


export const login=(email,password)=>{
    return async (dispatch,getState) =>{
        dispatch({type:SET_LOADING,payload:true})
        try{
            //console.log(getState())
            const {data}=await axios.post(`${config.url}/api/user/login/company`,{email,password});
            console.log(data)
            await AsyncStorage.setItem('token',data.token);
            dispatch({type:LOGIN,payload:data.user})
            dispatch({type:SET_LOADING,payload:false})
        }catch(err){
            console.log(err)
        }
    }
} 

export const registerCompany=({companyName,email,companyPhone,password})=>{
    console.log("here")
    return async dispatch =>{
        dispatch({type:SET_LOADING,payload:true})
        try{
            const {data}=await axios.post(`${config.url}/api/user/signup/company`,{companyName,email,companyPhone,password});
            console.log(data)
            await AsyncStorage.setItem('token',data.token);
            dispatch({type:SIGN_UP_COMPANY,payload:data.user})
            dispatch({type:SET_LOADING,payload:false})
        }catch(err){
            console.error(err)
        }
    }
}

export const registerStudent=
(
    {name,rollno,phone,password,year,branch,section,schoolPercentage,interPercentage,btechPercentage}
    )=>{
    let firstName =name.split(" ")[0]
    let lastName = name.split(" ")[1]
    let email =rollno+"@cvr.ac.in"
    let Class = year+" "+branch+" "+section;
    console.log("stud")

    
    return async dispatch =>{
        dispatch({type:SET_LOADING,payload:true})
        try{
            const {data}=await axios.post(`${config.url}/api/user/signup/student`,
            {   firstName,
                lastName,
                phoneNo:phone,
                rollNo:rollno,
                email,
                password,
                Class,
                schoolPercentage,
                interPercentage,
                btechPercentage});
            console.log(data)
            await AsyncStorage.setItem('token',data.token);
            dispatch({type:SIGN_UP_STUDENT,payload:data.user})
            dispatch({type:SET_LOADING,payload:false})
        }catch(err){
            console.error(err.message)
        }
    }
}
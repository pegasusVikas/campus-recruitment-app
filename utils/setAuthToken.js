import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const setAuthToken =async () =>{
    const token= await AsyncStorage.getItem("token")
        if(token){
            axios.defaults.headers.common["Auth-Token"]=token
        }else{
            delete axios.defaults.headers.common["Auth-Token"]
        }   
    
    
}

export default setAuthToken;
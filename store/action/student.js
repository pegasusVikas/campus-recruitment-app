import setAuthToken from '../../utils/setAuthToken';
import { SET_LOADING } from './loading'
import axios from 'axios'
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const APPLY_JOB = "APPLY_JOB"
export const FETCH_STUDENT = "FETCH_STUDENT"
export const FETCH_STUDENT_ARRAY = "FETCH_STUDENT_ARRAY"
export const FETCH_STUDENTS = "FETCH_STUDENTS"
export const REMOVE_STUDENT_APPLICATION = "REMOVE_STUDENT_APPLICATION"
export const FILTER_STUDENT = "FILTER_STUDENT"

export const fetchStudent = (_id) => {

    
    return async dispatch => {
        try {
            dispatch({ type: SET_LOADING, payload: true })
            await setAuthToken();
            const { data } = await axios.get(config.url+'/api/student/'+_id)
            console.log("stud", data)
            dispatch({ type: FETCH_STUDENT, payload: data })//add a notifier
            dispatch({ type: SET_LOADING, payload: false })
        } catch (err) {
            console.log(err)
        }
    }
}

export const setStudent = (student) => {

    return async dispatch => {
        try {
            dispatch({ type: SET_LOADING, payload: true })
            dispatch({ type: FETCH_STUDENT, payload: student })//add a notifier
            dispatch({ type: SET_LOADING, payload: false })
        } catch (err) {
            console.log(err)
        }
    }
}

export const removeStudentApplication =(_jobId,_studentId)=>{
    console.log("in remove")
    return async dispatch => {
        try {
            dispatch({ type: SET_LOADING, payload: true })
            await setAuthToken();
            const { data } = await axios.delete(config.url+'/api/job/reject/'+_jobId+"/"+_studentId)
            console.log("stud", data)
            dispatch({ type: REMOVE_STUDENT_APPLICATION, payload: data._id })//add a notifier
            dispatch({ type: SET_LOADING, payload: false })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getStudentsByArray = (students) => {
    
    return async dispatch => {
        try {
            dispatch({ type: SET_LOADING, payload: true })
            await setAuthToken();
            const { data } = await axios.post(config.url + '/api/student/array', { students })
            console.log("array of stud", data)
            dispatch({ type: FETCH_STUDENT_ARRAY, payload: data })//add a notifier
            dispatch({ type: SET_LOADING, payload: false })
        } catch (err) {
            console.log(err)
        }
    }
}

export const filterStudents = (students, searchStudent, filterArr) => {
    
    return async (dispatch) => {
        try {
            if (!(filterArr[0] || filterArr[1] || filterArr[2]))
                filterArr[0] = filterArr[1] = filterArr[2] = true;

            if (searchStudent) {
                const filterStudents = students.filter(({ firstName, lastName, phoneNo, rollNo }) => {
                    const name = firstName + lastName
                    if ((filterArr[0] && name.includes(searchStudent)) ||
                        (filterArr[1] && rollNo.includes(searchStudent)) ||
                        (filterArr[2] && phoneNo.includes(searchStudent)))
                        return true;
                    return false;
                })
                dispatch({ type: FILTER_STUDENT, payload: filterStudents })
            } else
                dispatch({ type: FILTER_STUDENT, payload: students })
        } catch (err) {
            console.log(err)
        }
    }
}

export const uploadResume = (file) => {
    
    return async (dispatch) => {
        try {
            //dispatch({ type: SET_LOADING, payload: true })
            const token =await AsyncStorage.getItem('token')
           
            const xhr = new XMLHttpRequest();
            
            xhr.open('POST',config.url+"/api/file/uploadResume");
            xhr.setRequestHeader('Auth-Token',token)
            xhr.onload = () => {
                const response = JSON.parse(xhr.response)
                console.log(response);
            };
            xhr.onerror = e => {
                console.log(e, 'upload failed');
            }
            xhr.ontimeout = e => {
                console.log(e, 'cloudinary timeout');
            };

            xhr.send(file);
           
           
            
        } catch (err) {
            console.log(err)
        }
    }
}

export const uploadProfilePicture = (file) => {
    
    return async (dispatch) => {
        try {
            //dispatch({ type: SET_LOADING, payload: true })
            const token =await AsyncStorage.getItem('token')
           
            const xhr = new XMLHttpRequest();
            
            xhr.open('POST',config.url+"/api/file/uploadProfilePicture");
            xhr.setRequestHeader('Auth-Token',token)
            xhr.onload = () => {
                const response = JSON.parse(xhr.response)
                console.log(response);
                dispatch({type:"NOTHING"})
            };
            xhr.onerror = e => {
                console.log(e, 'upload failed');
            }
            xhr.ontimeout = e => {
                console.log(e, 'cloudinary timeout');
            };

            xhr.send(file);

        } catch (err) {
            console.log(err)
        }
    }
}


import {
    FETCH_COMPANY_JOBS,
    FETCH_COMPANY_INTERNSHIPS,
    FETCH_COMPANY_TRAINING,
    FETCH_JOB,
    FETCH_JOB_ARRAY
} from '../action/job'
import { REMOVE_STUDENT_APPLICATION } from '../action/student'
REMOVE_STUDENT_APPLICATION
let initial = {
    jobProfile: {_companyId:{},applicants:[],qualified:[]},
    jobs: [],
    internships: [],
    trainings: []

}

export default (state = initial, action) => {
    console.log("job reducer", action.type)
    switch (action.type) {
        case FETCH_COMPANY_JOBS:
        case FETCH_JOB_ARRAY:
            return { ...state, jobs: [...action.payload] }
        case FETCH_COMPANY_INTERNSHIPS:
            return { ...state, internships: [...action.payload] }
        case FETCH_COMPANY_TRAINING:
            return { ...state, trainings: [...action.payload] }
        case FETCH_JOB:
            return {...state,jobProfile:{...action.payload}}
        case REMOVE_STUDENT_APPLICATION:
            return {...state,jobProfile:{...state.jobProfile,applicants:[...state.jobProfile.applicants.filter((id)=>id!=action.payload)]}}
        default:
            return state;
    }

}
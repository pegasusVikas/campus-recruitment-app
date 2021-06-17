import {
    FETCH_COMPANY_JOBS,
    FETCH_COMPANY_INTERNSHIPS,
    FETCH_COMPANY_TRAINING,
    FETCH_JOB
} from '../action/job'

let initial = {
    jobProfile: {},
    jobs: [],
    internships: [],
    trainings: []

}

export default (state = initial, action) => {
    console.log("job reducer", action.type)
    switch (action.type) {
        case FETCH_COMPANY_JOBS:
            return { ...state, jobs: [...action.payload] }
        case FETCH_COMPANY_INTERNSHIPS:
            return { ...state, internships: [...action.payload] }
        case FETCH_COMPANY_TRAINING:
            return { ...state, trainings: [...action.payload] }
        case FETCH_JOB:
            return {...state,jobProfile:{...action.payload}}
        default:
            return state;
    }

}
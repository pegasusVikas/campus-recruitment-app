import {
    FETCH_STUDENT,
    FETCH_STUDENTS,
    FETCH_STUDENT_ARRAY,
    FILTER_STUDENT,
    REMOVE_STUDENT_APPLICATION
} from '../action/student'

let initial = {
    studentProfile: {
        applied:[]
    },
    students: [],
    filteredStudents:[]
}

export default (state = initial, action) => {
    switch (action.type) {
        case FETCH_STUDENT:
            return {...state,studentProfile:{...action.payload}}
        case FETCH_STUDENT_ARRAY:
            return {...state,students:action.payload,filteredStudents:action.payload}
        case FILTER_STUDENT:
            return {...state,filteredStudents:action.payload}
        case REMOVE_STUDENT_APPLICATION:
            const filstud=[...state.filteredStudents.filter((stud)=>stud._id!=action.payload)]
            const stud=[...state.students.filter((stud)=>stud._id!=action.payload)]
            return {...state,
                filteredStudents:filstud,
                students:stud,
                }
        default:
            return state;
    }

}
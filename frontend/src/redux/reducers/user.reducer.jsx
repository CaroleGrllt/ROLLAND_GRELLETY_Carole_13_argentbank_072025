import { GET_USER, EDIT_USER } from "../actions/user.action";

const initialState = {
    firstName: null,
    lastName: null,
};


export default function userReducer(state = initialState, action) {
    switch(action.type) { 
        case GET_USER : 
            return {  
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            }
        case EDIT_USER:
            return {  
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            }            
        default : 
            return state
    }
}
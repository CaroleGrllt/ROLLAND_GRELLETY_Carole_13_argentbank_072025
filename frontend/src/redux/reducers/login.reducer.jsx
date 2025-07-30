import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/login.action"

const initialState = {
  isConnected: false,
  token: null,
  error: null,
}

export default function loginReducer(state = initialState, action) {
switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isConnected: true,
        token: action.payload,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isConnected: false,
        token: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        isConnected: false,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

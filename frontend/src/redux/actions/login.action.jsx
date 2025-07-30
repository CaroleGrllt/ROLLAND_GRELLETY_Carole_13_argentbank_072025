import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT'

export const loginUser = (email, password, rememberMe) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(response);
      
      const token = response.data.body.token;

      if (rememberMe) {
        localStorage.setItem('token', token);
      }

      dispatch({ 
        type: LOGIN_SUCCESS, 
        payload: token 
      });

    } catch (error) {

        console.log(error)
        console.log(error.response.data.message);
        
        let errorMsg
      
      if (error.response.data.message) {
        errorMsg = error.response.data.message
      }

      dispatch({ 
        type: LOGIN_FAIL, 
        payload: errorMsg 
      });

      throw new Error(errorMsg);
    }
  };
}

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ 
      type: LOGOUT 
    });
  };
}
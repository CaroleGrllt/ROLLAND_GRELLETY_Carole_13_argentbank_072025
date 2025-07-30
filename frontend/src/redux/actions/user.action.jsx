import axios from "axios";

export const GET_USER = "GET_USER"
export const EDIT_USER = "EDIT_USER"

export const getUser = (token) => {
  return async (dispatch) => {
    try {
      const tokenKey = token || localStorage.getItem('token');
      if (!tokenKey) throw new Error('No token found');

      const response = await axios.post(
        'http://localhost:3001/api/v1/user/profile',
        {}, 
        {
          headers: {
            Authorization: `Bearer ${tokenKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response)

      const userData = response.data.body; 

      dispatch({
        type: GET_USER,
        payload: userData,
      });
    } catch (error) {
      console.error('Failed to fetch user:', error.message);
    }
  };
};

export const editUser = (firstName, lastName, token) => {
    return async (dispatch) => {
        try {
            const tokenKey = token || localStorage.getItem('token');
            if (!tokenKey) throw new Error('No token found');

            const response = await axios.put(
                'http://localhost:3001/api/v1/user/profile',
                {
                    firstName,
                    lastName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response)

            const updateData = response.data.body; 

            dispatch({
                type: EDIT_USER,
                payload: updateData,
            });

        } catch (error) {
            console.error('Failed to edit user:', error.message);
        }
    }
}
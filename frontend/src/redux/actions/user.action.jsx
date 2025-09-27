import axios from 'axios';

export const GET_USER = 'GET_USER';
export const EDIT_USER = 'EDIT_USER';

// Base URL depuis .env / .env.production
const API_BASE =
  (import.meta?.env?.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

// Helper pour récupérer le token
const getToken = (explicitToken?: string) =>
  explicitToken ||
  localStorage.getItem('token') ||
  sessionStorage.getItem('token');

export const getUser = (token?: string) => {
  return async (dispatch) => {
    try {
      const tokenKey = getToken(token);
      if (!tokenKey) throw new Error('No token found');

      const response = await axios.post(
        `${API_BASE}/api/v1/user/profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const userData = response?.data?.body ?? response?.data;
      if (!userData) throw new Error('Invalid server response');

      dispatch({ type: GET_USER, payload: userData });
      return userData;

    } catch (error) {
      const status = error?.response?.status;
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Network error';

      console.error('Failed to fetch user', { status, serverMsg });

      // Optionnel: en cas de 401, on peut nettoyer le token
      if (status === 401) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }

      throw new Error(serverMsg);
    }
  };
};

export const editUser = (firstName: string, lastName: string, token?: string) => {
  return async (dispatch) => {
    try {
      const tokenKey = getToken(token);
      if (!tokenKey) throw new Error('No token found');

      const response = await axios.put(
        `${API_BASE}/api/v1/user/profile`,
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${tokenKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const updateData = response?.data?.body ?? response?.data;
      if (!updateData) throw new Error('Invalid server response');

      dispatch({ type: EDIT_USER, payload: updateData });
      return updateData;

    } catch (error) {
      const status = error?.response?.status;
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Network error';

      console.error('Failed to edit user', { status, serverMsg });
      throw new Error(serverMsg);
    }
  };
};

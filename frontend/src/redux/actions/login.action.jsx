import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Base URL: .env/.env.production -> VITE_API_URL
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

export const loginUser = (email, password, rememberMe) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/v1/user/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // backend: { body: { token, ... } }
      const token = response?.data?.body?.token;
      if (!token) {
        throw new Error('Token manquant dans la réponse du serveur.');
      }

      // Persistance
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      dispatch({ type: LOGIN_SUCCESS, payload: token });
      return token; // utile si l'appelant veut enchaîner

    } catch (error) {
      // Tolérant aux erreurs réseau/CORS (sans response)
      const status = error?.response?.status;
      const serverMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Network error';

      console.error('Login failed', { status, serverMsg });

      dispatch({ type: LOGIN_FAIL, payload: serverMsg });
      throw new Error(serverMsg);
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };
};

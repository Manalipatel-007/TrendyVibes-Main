import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig"; // Ensure this is set correctly
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

// Register Actions
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (token) => ({ type: REGISTER_SUCCESS, payload: token });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const { token, user } = response.data;
    console.log("register success", token, user);
    console.log("Backend response: ", response.data); // Log the backend response
    if (token) {
      localStorage.setItem("jwt", token);
    }
    dispatch(registerSuccess({ token, user }));
    dispatch(getUser()); // Fetch user profile after successful registration
  } catch (error) {
    let errorMessage;
    if (error.response && error.response.status === 400) {
      errorMessage = "User Already Exist!";
    }
    dispatch(registerFailure(errorMessage));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userdata) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userdata);
    console.log("Backend response: ", response.data); // Log the backend response
    const { jwt: token, user } = response.data; // Access the jwt field
    console.log("login success", token, user);
    if (token) {
      localStorage.setItem("jwt", token);
    }
    dispatch(loginSuccess({ token, user }));
    dispatch(getUser()); // Fetch user profile after successful login
  } catch (error) {
    let errorMessage;
    if (error.response && error.response.status === 401) {
      errorMessage = "Invalid credentials. Please try again.";
    }
    dispatch(loginFailure(errorMessage));
  }
};

// Get User Actions
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = () => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    dispatch({ type: GET_USER_FAILURE, payload: "Token not available" });
    return;
  }

  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
};

// ...existing code...
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const response = await api.post("/register", userData);
    console.log("API response: ", response); // Log the entire API response
    const { token } = response.data;
    if (!token) {
      throw new Error("Token not found in response");
    }
    console.log("Token received from backend: ", token); // Log the token received from backend
    dispatch({ type: REGISTER_SUCCESS, payload: token });
    localStorage.setItem("jwt", token); // Store token in localStorage
    console.log("Token stored in Redux state and localStorage"); // Confirm token storage
  } catch (error) {
    console.error("Registration error: ", error.response ? error.response.data : error.message); // Log any errors
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};
// ...existing code...

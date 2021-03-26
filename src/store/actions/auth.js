import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const auth = (email, password, isSignUp) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_START });
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBWt47TzxG6-xJI1gRWpMIeCu8dYXLSnM";
  if (!isSignUp)
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBWt47TzxG6-xJI1gRWpMIeCu8dYXLSnM";

  axios
    .post(url, authData)
    .then((response) => {
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", response.data.localId);
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        userId: response.data.localId,
        token: response.data.idToken,
      });
      setTimeout(() => {
        dispatch({ type: actionTypes.AUTH_LOGOUT });
      }, response.data.expiresIn * 1000);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.AUTH_FAIL, error: err });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  dispatch({ type: actionTypes.AUTH_LOGOUT });
};

export const setAuthRedirectPath = (path) => (dispatch) => {
  dispatch({ type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path });
};
export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) dispatch({ type: actionTypes.AUTH_LOGOUT });
  else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date())
      dispatch({ type: actionTypes.AUTH_LOGOUT });
    else {
      const userId = localStorage.getItem("userId");
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
      });
      setTimeout(() => {
        dispatch({ type: actionTypes.AUTH_LOGOUT });
      }, expirationDate.getTime() - new Date().getTime());
    }
  }
};

import axios from "axios";
axios.defaults.withCredentials = true;

const loginUrl = `${process.env.REACT_APP_AXIOS_URL}/api/user/login`;
const isLoggedUrl = `${process.env.REACT_APP_AXIOS_URL}/api/user/islogged`;
const logoutUrl = `${process.env.REACT_APP_AXIOS_URL}/api/user/logout`;

export const isLoggedIn = () => {
  return (dispatch) => {
    axios.get(isLoggedUrl, { withCredentials: true }).then((res) => {
      dispatch({
        type: "IS_LOGGED_IN",
        payload: res.data,
      });
    });
  };
};

export const LoginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await response.json();
      window.location.reload();
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const LogoutUser = () => {
  return (dispatch) => {
    axios.get(logoutUrl, { withCredentials: true }).then(() => {
      window.location.reload();
      dispatch({
        type: "LOGOUT_USER",
      });
    });
  };
};

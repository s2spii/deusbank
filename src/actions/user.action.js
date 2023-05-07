import axios from "axios";
axios.defaults.withCredentials = true;

const getUrl = `${process.env.REACT_APP_AXIOS_URL}/api/user/get`;
const registerUrl = `${process.env.REACT_APP_AXIOS_URL}/api/user/register`;
const updateSalaryUrl = `${process.env.REACT_APP_AXIOS_URL}/api/user/salary`;
const updateUsernameUrl = `${process.env.REACT_APP_AXIOS_URL}/api/user/username`;
const updateEmailUrl = `${process.env.REACT_APP_AXIOS_URL}/api/user/email`;
const updateBirthdayUrl = `${process.env.REACT_APP_AXIOS_URL}/api/user/bithday`;
const updatePasswordUrl = `${process.env.REACT_APP_AXIOS_URL}/api/user/password`;

export const getUsers = () => {
  return (dispatch) => {
    axios.get(getUrl).then((res) => {
      dispatch({
        type: "GET_USERS",
        payload: res.data,
      });
    });
  };
};

export const RegisterUser = (user) => {
  return (dispatch) => {
    axios.post(registerUrl, user).then((res) => {
      dispatch({
        type: "REGISTER_USER",
        payload: res.data,
      });
    });
  };
};

export const setCurrentUser = () => {
  return (dispatch) => {
    axios.get(getUrl).then((res) => {
      dispatch({
        type: "SET_CURRENT_USER",
        payload: res.data,
      });
    });
  };
};

export const setSalary = (salary) => {
  return (dispatch) => {
    axios
      .put(updateSalaryUrl, { salary: salary })
      .then((res) => {
        dispatch({
          type: "SET_SALARY",
          payload: salary,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setUsername = (username) => {
  return (dispatch) => {
    axios
      .put(updateUsernameUrl, { username: username })
      .then((res) => {
        dispatch({
          type: "SET_USERNAME",
          payload: username,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setEmail = (email) => {
  return (dispatch) => {
    axios
      .put(updateEmailUrl, { email: email })
      .then((res) => {
        dispatch({
          type: "SET_EMAIL",
          payload: email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setBirthday = (birthday) => {
  return (dispatch) => {
    axios
      .put(updateBirthdayUrl, { birthday: birthday })
      .then((res) => {
        dispatch({
          type: "SET_BIRTHDAY",
          payload: birthday,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setPassword = (password) => {
  return (dispatch) => {
    axios
      .put(updatePasswordUrl, { password: password })
      .then((res) => {
        dispatch({
          type: "SET_PASSWORD",
          payload: password,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

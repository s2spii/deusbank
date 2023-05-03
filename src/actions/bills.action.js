import axios from "axios";
axios.defaults.withCredentials = true;

const url = process.env.REACT_APP_AXIOS_URL;

export const getBills = () => {
  return (dispatch) => {
    axios.get(`${url}/api/bills/get`).then((res) => {
      dispatch({
        type: "GET_BILLS",
        payload: res.data,
      });
    });
  };
};

export const newBills = (bill) => {
  return (dispatch) => {
    axios.post(`${url}/api/bills/add`, bill).then((res) => {
      dispatch({
        type: "ADD_BILL",
        payload: res.data,
      });
    });
  };
};

export const editBills = (bill) => {
  return (dispatch) => {
    axios.put(`${url}/api/bills/edit`, bill).then((res) => {
      dispatch({
        type: "EDIT_BILL",
        payload: bill,
      });
    });
  };
};

export const deleteBill = (id) => {
  return (dispatch) => {
    axios.delete(`${url}/api/bills/delete/${id}`).then((res) => {
      dispatch({
        type: "DELETE_BILL",
        payload: id,
      });
    });
  };
};

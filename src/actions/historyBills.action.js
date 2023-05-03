import axios from "axios";

const url = process.env.REACT_APP_AXIOS_URL + "/api";

export const getHistoryBills = () => {
  return (dispatch) => {
    axios.get(`${url}/history/get`).then((res) => {
      dispatch({
        type: "GET_HISTORY_BILLS",
        payload: res.data.historyBills,
      });
    });
  };
};

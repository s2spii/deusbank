const initialState = [];

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_HISTORY_BILLS":
      return action.payload;
    default:
      return state;
  }
}

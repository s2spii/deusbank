const initialState = { users: [], current: {} };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "REGISTER_USER":
      return [...state, action.payload];
    case "IS_LOGGED_IN":
      return { ...state, current: action.payload.user };
    case "SET_SALARY":
      return {
        ...state,
        current: { ...state.current, salary: action.payload },
      };
    case "SET_USERNAME":
      return {
        ...state,
        current: { ...state.current, username: action.payload },
      };
    case "SET_EMAIL":
      return {
        ...state,
        current: { ...state.current, email: action.payload },
      };
    case "SET_PASSWORD":
      return {
        ...state,
        current: { ...state.current, password: action.payload },
      };

    default:
      return state;
  }
}

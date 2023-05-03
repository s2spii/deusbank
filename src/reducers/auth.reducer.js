const initialState = { isLogged: false };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "IS_LOGGED_IN":
      return {
        isLogged: action.payload.logged,
      };
    case "LOGIN_USER":
      return {
        isLogged: action.payload.logged,
      };
    case "LOGOUT_USER":
      return {
        isLogged: false,
      };

    default:
      return state;
  }
}

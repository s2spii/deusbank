const initialState = [];

export default function billsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_BILLS":
      return action.payload;
    case "ADD_BILL":
      return state ? [...state, action.payload] : action.payload;
    case "EDIT_BILL":
      return state.map((bill) => {
        if (bill.id === action.payload.id) {
          return {
            ...bill,
            typeOfBill: action.payload.name
              ? action.payload.name
              : bill.typeOfBill,
            costofBill: action.payload.price
              ? action.payload.price
              : bill.costofBill,
          };
        }
        return bill;
      });
    case "DELETE_BILL":
      return state.filter((bill) => bill.id !== action.payload);

    default:
      return state;
  }
}

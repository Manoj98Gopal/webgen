export const commonReducer = (state, action) => {
  switch (action.type) {
    case "userInput":
    case "webGenLoading":
    case "webData":
      return {
        ...state,
        [action.type]: action.payload
      };
    default:
      return state;
  }
};

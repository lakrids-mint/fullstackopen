const initialState = "";

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return action.userInput;
    default:
      return state;
  }
};
//action creator
export const filterInputChange = userInput => {
  ///console.log("filterreducer, action creator :", userInput);
  return {
    type: "FILTER",
    userInput
  };
};

export default filterReducer;

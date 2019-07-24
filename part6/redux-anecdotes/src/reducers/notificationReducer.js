const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};
//action creator
export const notificationChange = notification => {
  return {
    type: "SET_NOTIFICATION",
    notification
  };
};

export default notificationReducer;

import React from "react";
import { connect } from "react-redux";

//import { notificationChange } from "../reducers/notificationReducer";
//setTimeout(() => alert('Hello'), 1000);
const Notification = props => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };
  const notification = props.notification;

  return (
    <div style={style}>{notification ? notification : (style.border = "")}</div>
  );
};

const mapStateToProps = state => {
  // sometimes it is useful to console log from mapStateToProps
  //console.log(state);
  return {
    notification: state.notification
  };
};
export default connect(mapStateToProps)(Notification);

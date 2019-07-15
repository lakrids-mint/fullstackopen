import React from "react";
const Login = props => {
  console.log(props);
  return (
    <form>
      <label>
        Username <input type="text" placeholder="Enter username" />
      </label>
      <br />
      <label>
        Password <input type="password" placeholder="Enter password" />
      </label>
      <br />
      <input type="submit" />
    </form>
  );
};

export default Login;

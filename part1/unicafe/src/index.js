import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, bad, neutral }) => {
  if (good || bad || neutral) {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
        </tbody>
      </table>
    );
  } else {
    return <p> No feedback yet </p>;
  }
};
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h1>Statistics</h1>

      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

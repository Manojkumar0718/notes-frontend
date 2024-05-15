/* eslint-disable react/prop-types */

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
        <p>This app is used by pressing the buttons</p>
      </div>
    );
  }
  return (
    <div>
      <p>{allClicks.join(" ")}</p>
    </div>
  );
};

export default History;

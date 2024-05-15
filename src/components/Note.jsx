/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const Note = ({ content, important, toggleImportance }) => {
  const label = important ? "Make not important" : "Make important";

  return (
    <>
      <li className="note" >
        {content}
        <button onClick={toggleImportance}>{label} </button>
      </li>
    </>
  );
};

export default Note;

import React from "react";

const TodoComponent = ({ todos }) => {
  const { id, todo, isCompleted } = todos;

  return (
    <>
      <li>
        <label>
          <input type="checkbox" className="checkbox" />
          <p>{todo}</p>
        </label>
        <button data-testid="modify-button" className="modify-btn">
          수정
        </button>
        <button data-testid="delete-button" className="delete-btn">
          삭제
        </button>
      </li>
    </>
  );
};

export default TodoComponent;

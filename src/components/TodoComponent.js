import React from "react";
import { GoTrashcan, GoPencil } from "react-icons/go";

const TodoComponent = ({ todos, updateTodo, deleteTodo }) => {
  const { id, todo, isCompleted } = todos;

  return (
    <>
      <li>
        <label>
          <input type="checkbox" className="checkbox" />
          <p>{todo}</p>
        </label>
        <button
          data-testid="modify-button"
          className="modify-btn"
          onClick={() => updateTodo(id, todo, isCompleted)}
        >
          <GoPencil />
        </button>
        <button
          data-testid="delete-button"
          className="delete-btn"
          onClick={deleteTodo}
        >
          <GoTrashcan />
        </button>
      </li>
    </>
  );
};

export default TodoComponent;

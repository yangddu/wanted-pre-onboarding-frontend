import React, { useCallback, useState } from "react";
import { GoTrashcan, GoPencil, GoX } from "react-icons/go";

const TodoComponent = ({ todos, updateTodo, deleteTodo }) => {
  const { id, todo, isCompleted } = todos;
  const [modifyMode, setModifyMode] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const checkToggle = () => {
    updateTodo(id, todo, !isCompleted);
  };

  const inputChange = useCallback((e) => {
    setInputVal(e.target.value);
  }, []);

  const submitButton = () => {
    if (inputVal === "") {
      updateTodo(id, todo, isCompleted);
    } else {
      updateTodo(id, inputVal, isCompleted);
    }
    setModifyMode(false);
  };

  return (
    <>
      {modifyMode ? (
        <li>
          <label>
            <input
              type="checkbox"
              id="checkbox"
              onChange={checkToggle}
              checked={isCompleted}
            />
            <input
              data-testid="modify-input"
              className="modify-input"
              defaultValue={todo}
              onChange={inputChange}
            />
          </label>
          <button
            data-testid="submit-button"
            className="submit-btn"
            onClick={submitButton}
          >
            <GoPencil />
          </button>
          <button
            data-testid="cancel-button"
            className="close-btn"
            onClick={() => setModifyMode(false)}
          >
            <GoX />
          </button>
        </li>
      ) : (
        <li>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              onChange={checkToggle}
              checked={isCompleted}
            />
            <span className={isCompleted ? "done" : ""}>{todo}</span>
          </label>
          <button
            data-testid="modify-button"
            className="modify-btn"
            onClick={() => setModifyMode(true)}
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
      )}
    </>
  );
};

export default TodoComponent;

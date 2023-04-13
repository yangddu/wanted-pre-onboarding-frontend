import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import { BsPlusCircleFill } from "react-icons/bs";
import "../style/Todo.scss";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [todos, setTodo] = useState("");
  const [todoValid, setTodoValid] = useState(true);
  const token = localStorage.getItem("JWT");

  useEffect(() => {
    getTodo();
  }, []);

  const todoInput = (e) => {
    const { value } = e.target;
    setTodo(value);
    console.log("???", !!value);
    console.log(value.length);
    setTodoValid(true);
    if (value.length !== 0 || !!value) {
      setTodoValid(false);
    }
  };

  //todo 추가
  const addTodo = (e) => {
    e.preventDefault();

    try {
      axios
        .post(
          "https://www.pre-onboarding-selection-task.shop/todos",
          {
            todo: todos
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((response) => {
          if (response.status === 201) {
            getTodo();
          }
        });
    } catch (error) {
      console.log(error);
    }
    setTodo("");
    setTodoValid(true);
  };

  //todo 불러오기
  const getTodo = () => {
    try {
      axios
        .get("https://www.pre-onboarding-selection-task.shop/todos", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          setTodoList(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!token ? (
        <Navigate to="/signin" />
      ) : (
        <div className="todo-wrapper">
          <h1 className="title">Todo List</h1>
          <form onSubmit={addTodo}>
            <div className="input-wrapper">
              <input
                data-testid="new-todo-input"
                value={todos}
                onChange={todoInput}
              />
              <button
                data-testid="new-todo-add-button"
                type="submit"
                className="plus-btn"
                disabled={todoValid}
              >
                <BsPlusCircleFill />
              </button>
            </div>
          </form>
          <ul>
            {todoList.map((todoItem) => (
              <li key={todoItem.id}>
                <label>
                  <input type="checkbox" className="checkbox" />
                  <p>{todoItem.todo}</p>
                </label>
                <button data-testid="modify-button" className="modify-btn">
                  수정
                </button>
                <button data-testid="delete-button" className="delete-btn">
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Todo;

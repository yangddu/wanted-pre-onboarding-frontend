import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import TodoComponent from "../components/TodoComponent";

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
    const regExp = /^\s|\s$/;
    let spaceCheck = value.replace(/^\s+|\s+$/gm, "");
    if (!!spaceCheck && (value.length !== 0 || !!value || regExp.test(value))) {
      setTodoValid(false);
    } else {
      setTodoValid(true);
    }
    setTodo(value);
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

  const updateTodo = (id, todo, isCompleted) => {
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: todo,
          isCompleted
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      )
      .then((res) => {
        if (res.status === 200) {
          getTodo();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
      });
  };

  //todo 삭제
  const deleteTodo = (id) => {
    try {
      axios
        .delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          if (response.status === 204) {
            getTodo();
          }
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
              <TodoComponent
                todos={todoItem}
                key={todoItem.id}
                checked={todoItem.isCompleted}
                updateTodo={updateTodo}
                deleteTodo={() => deleteTodo(todoItem.id)}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Todo;

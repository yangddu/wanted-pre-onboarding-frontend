import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoItem from '../components/TodoItem'

import { BsPlusCircleFill } from 'react-icons/bs'
import '../style/Todo.scss'
import { todoRegEx } from '../utils/regex'
import useInputs from '../hooks/useInputs'
import { TODO, TODO_ITEM } from '../types'
import {
  createTodoAPI,
  deleteTodoAPI,
  getTodoAPI,
  updateTodoAPI
} from '../api/todo'
import { AxiosError, AxiosResponse } from 'axios'

const Todo = () => {
  const {
    values: { todo },
    handleChange,
    setValues
  } = useInputs({ todo: '' })
  const [todoList, setTodoList] = useState([])
  const navigate = useNavigate()

  //todo 추가
  const addTodo = () => {
    createTodoAPI(todo)
      .then(res => {
        if (res.status === 201) {
          getTodo()
          setValues({ todo: '' })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  //todo 불러오기
  const getTodo = async () => {
    try {
      const res: any = await getTodoAPI()
      // console.log(res)
      // setTodoList(res.data)
      setTodoList(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const editTodo = (id: number, todo: string, isCompleted: boolean) => {
    updateTodoAPI(id, todo, isCompleted)
      .then(res => {
        if (res.status === 200) {
          getTodo()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  //todo 삭제
  const deleteTodo = (id: number) => {
    deleteTodoAPI(id)
      .then(res => {
        if (res.status === 204) {
          getTodo()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // useEffect(() => {
  //   getTodo()

  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     navigate('/signin')
  //   }
  // }, [navigate])

  return (
    <div>
      <div className="todo-wrapper">
        <h1 className="title">Todo List</h1>
        <form
          onSubmit={e => {
            e.preventDefault()
            addTodo()
          }}
        >
          <div className="input-wrapper">
            <input
              id="todo"
              name="todo"
              data-testid="new-todo-input"
              value={todo}
              onChange={handleChange}
            />
            <button
              data-testid="new-todo-add-button"
              type="submit"
              className="plus-btn"
            >
              <BsPlusCircleFill />
            </button>
          </div>
        </form>
        <ul>
          {todoList.map((todoItem: TODO_ITEM) => (
            <TodoItem
              todos={todoItem}
              key={todoItem.id}
              checked={todoItem.isCompleted}
              editTodo={editTodo}
              deleteTodo={() => deleteTodo(todoItem.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todo

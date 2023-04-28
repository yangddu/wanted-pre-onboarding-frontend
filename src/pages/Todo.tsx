import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoComponent from '../components/TodoComponent'

import { BsPlusCircleFill } from 'react-icons/bs'
import '../style/Todo.scss'
import { AddTodo, DeleteTodo, EditTodo, GetTodo } from 'api'
import { todoRegEx } from 'utils/regex'
import useInputs from 'hooks/useInputs'
import { TODO_ITEM } from 'types/constant'

const Todo = () => {
  const {
    values: { todo },
    handleChange,
    setValues
  } = useInputs({ todo: '' })
  const [todoList, setTodoList] = useState([])
  const [todoValid, setTodoValid] = useState(true)
  const navigate = useNavigate()

  //todo 추가
  const addTodo = () => {
    if (todoRegEx(todo)) {
      setTodoValid(true)
    } else {
      setTodoValid(false)
    }
    AddTodo(todo)
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
  const getTodo = () => {
    GetTodo()
      .then(res => {
        setTodoList(res.data)
      })
      .catch((err: any) => console.log(err))
  }

  const editTodo = (id: number, todo: string, isCompleted: boolean) => {
    EditTodo(id, todo, isCompleted)
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
    DeleteTodo(id)
      .then(res => {
        if (res.status === 204) {
          getTodo()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getTodo()

    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/signin')
    }
  }, [navigate])

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
            <TodoComponent
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

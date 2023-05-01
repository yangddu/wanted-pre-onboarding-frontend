import React, { useCallback, useState } from 'react'
import { GoTrashcan, GoPencil, GoX } from 'react-icons/go'
import { TODO_ITEM_PROPS } from '../types'

const TodoComponent = ({ todos, editTodo, deleteTodo }: TODO_ITEM_PROPS) => {
  const { id, todo, isCompleted } = todos
  const [isEditMode, setIsEditMode] = useState(false)
  const [updateVal, setUpdateVal] = useState('')

  const checkToggle = () => {
    editTodo(id, todo, !isCompleted)
  }

  const inputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateVal(e.target.value)
  }, [])

  const submitButton = () => {
    if (updateVal === '') {
      editTodo(id, todo, isCompleted)
    } else {
      editTodo(id, updateVal, isCompleted)
    }
    setIsEditMode(false)
  }

  const showEditMode = () => (
    <>
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
          onClick={() => setIsEditMode(false)}
        >
          <GoX />
        </button>
      </li>
    </>
  )

  const showViewMode = () => (
    <>
      <li>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            onChange={checkToggle}
            checked={isCompleted}
          />
          <span className={isCompleted ? 'done' : ''}>{todo}</span>
        </label>
        <button
          data-testid="modify-button"
          className="modify-btn"
          onClick={() => setIsEditMode(true)}
        >
          <GoPencil />
        </button>
        <button
          data-testid="delete-button"
          className="delete-btn"
          onClick={() => deleteTodo(id)}
        >
          <GoTrashcan />
        </button>
      </li>
    </>
  )

  return <div>{isEditMode ? showEditMode() : showViewMode()}</div>
}

export default TodoComponent

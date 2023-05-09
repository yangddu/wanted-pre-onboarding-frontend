import React, { useCallback, useState } from 'react'
import { GoTrashcan, GoPencil, GoX } from 'react-icons/go'
import { TODO_ITEM_PROPS } from '../types'
import useInputs from '../hooks/useInputs'
import useTodoUpdater from '../hooks/useTodoUpdater'

const TodoComponent = ({ todos, todoItem, deleteTodo }: any) => {
  const {
    values: { updateVal },
    handleChange,
    setValues
  } = useInputs({ updateVal: '' })
  const {
    handleCheckToggle,
    todoStatus,
    handleModify,
    handleCancel,
    handleDelete,
    // handleChange,
    handleSubmitButton
    // updateVal
  } = useTodoUpdater(todos, deleteTodo, todoItem, updateVal)
  console.log('values', updateVal)

  // const [updateVal, setUpdateVal] = useState('')

  // const inputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUpdateVal(e.target.value)
  // }, [])

  // const submitButton = () => {
  //   if (updateVal === '') {
  //     editTodo(id, todo, isCompleted)
  //   } else {
  //     editTodo(id, updateVal, isCompleted)
  //   }
  //   setModifyMode(false)
  // }

  const showEditMode = () => (
    <>
      <li>
        <label>
          <input
            type="checkbox"
            id="checkbox"
            onChange={handleCheckToggle}
            checked={todoStatus.isCompleted}
          />
          <input
            data-testid="modify-input"
            className="modify-input"
            defaultValue={todoStatus.value}
            onChange={handleChange}
          />
        </label>
        <button
          data-testid="submit-button"
          className="submit-btn"
          onClick={handleSubmitButton}
        >
          <GoPencil />
        </button>
        <button
          data-testid="cancel-button"
          className="close-btn"
          onClick={handleCancel}
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
            onChange={handleCheckToggle}
            checked={todoStatus.isCompleted}
          />
          <span className={todoStatus.isCompleted ? 'done' : ''}>
            {todoStatus.value}
          </span>
        </label>
        <button
          data-testid="modify-button"
          className="modify-btn"
          onClick={handleModify}
        >
          <GoPencil />
        </button>
        <button
          data-testid="delete-button"
          className="delete-btn"
          onClick={handleDelete}
        >
          <GoTrashcan />
        </button>
      </li>
    </>
  )

  return <div>{todoStatus.modifyMode ? showEditMode() : showViewMode()}</div>
}

export default TodoComponent

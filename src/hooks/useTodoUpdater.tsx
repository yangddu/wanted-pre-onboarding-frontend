import { useState } from 'react'
import { TODO, TODO_MANAGER } from '../types'
import { deleteTodoAPI, updateTodoAPI } from '../api/todo'
import useInputs from './useInputs'

const useTodoUpdater = (
  todos: TODO,
  deleteTodo: any,
  todoItem: any,
  updateVal: any
) => {
  const [todoStatus, setTodoStatus] = useState<TODO_MANAGER | any>({
    modifyMode: false,
    isCompleted: todoItem?.isCompleted,
    value: todoItem?.todo
  })
  // const {
  //   values: { updateVal },
  //   handleChange
  // } = useInputs({ updateVal: '' })

  const handleCancel = () => {
    setTodoStatus({
      ...todoStatus,
      modifyMode: false
    })
  }

  const handleModify = () => {
    setTodoStatus({
      ...todoStatus,
      modifyMode: true
    })
  }

  const handleDelete = () => {
    deleteTodoAPI(todoItem.id)
    deleteTodo()
  }

  const handleCheckToggle = async () => {
    const todo = todoStatus.value
    const isCompleted = !todoStatus.isCompleted

    await updateTodoAPI(todoItem.id, todo, isCompleted)
    setTodoStatus({
      ...todoStatus,
      isCompleted: !todoStatus.isCompleted
    })
  }

  const handleSubmitButton = async () => {
    // const todoValue = {
    // const todoValue = updateVal !== null ? updateVal : todoStatus.todo
    // console.log(todoItem)
    // const isCompleted = todoStatus.isCompleted
    // }
    // const todoUpdateVal = {
    //   todo: updateVal,
    //   isCompleted: todoStatus.isCompleted
    // }
    console.log(updateVal)
    if (updateVal === '') {
      await updateTodoAPI(todoItem.id, todoItem.todo, todoItem.isCompleted)
    } else {
      await updateTodoAPI(todoItem.id, updateVal, todoItem.isCompleted)
    }
    setTodoStatus({
      ...todoStatus,
      modifyMode: false,
      value: updateVal !== null ? updateVal : todoStatus.todo
    })
  }
  return {
    handleCheckToggle,
    todoStatus,
    handleModify,
    handleCancel,
    handleDelete,
    handleSubmitButton,
    // handleChange,
    updateVal
  }
}

export default useTodoUpdater

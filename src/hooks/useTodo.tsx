import { useEffect, useState } from 'react'
import { TODO } from '../types'
import { createTodoAPI, getTodoAPI } from '../api/todo'
import useInputs from './useInputs'

const useTodo = () => {
  const [todos, setTodos] = useState<TODO[]>([])
  const {
    values: { todo },
    handleChange,
    setValues
  } = useInputs({ todo: '' })

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await getTodoAPI()
        setTodos(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTodo()
  }, [])

  const handleCreate = async (e: React.FormEvent<HTMLElement>) => {
    try {
      e.preventDefault()
      const res = await createTodoAPI(todo)
      setTodos([...todos, res.data])
      setValues({ todo: '' })
    } catch (error) {
      console.error(error)
    }
  }

  return { todos, setTodos, handleCreate, todo, handleChange }
}

export default useTodo

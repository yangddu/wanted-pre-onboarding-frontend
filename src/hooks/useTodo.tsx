import { useEffect, useState } from 'react'
import { TODO } from '../types'
import { getTodoAPI } from '../api/todo'

const useTodo = () => {
  const [todos, setTodos] = useState<TODO[]>([])

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

  return { todos, setTodos }
}

export default useTodo

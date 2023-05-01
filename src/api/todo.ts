import { AxiosResponse } from 'axios'
import { todoInstance } from '.'
import { TODO } from '../types'

export const getTodoAPI = (): Promise<AxiosResponse<TODO[]>> =>
  todoInstance.get(`/todos`)

export const createTodoAPI = (todo: string): Promise<AxiosResponse<TODO>> =>
  todoInstance.post(`/todos`, {
    todo
  })

export const updateTodoAPI = (
  id: number,
  todo: string,
  isCompleted: boolean
): Promise<AxiosResponse<TODO>> =>
  todoInstance.put(`/todos/${id}`, {
    todo,
    isCompleted
  })

export const deleteTodoAPI = (id: number) => todoInstance.delete(`/todos/${id}`)

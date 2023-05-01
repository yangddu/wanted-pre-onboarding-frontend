import { ChangeEvent } from 'react'

export type InputProp = {
  id?: string
  testid: string
  type: string
  name: string
  value?: string
  placeholder?: string
  defaultValue?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface TODO {
  id: number
  todo: string
  isCompleted: boolean
}

export interface TODO_ITEM {
  id: number
  todo: string
  isCompleted: boolean
}

export interface UPDATE_TODO {
  todo: string
  isCompleted: boolean
}

export interface TODO_ITEM_PROPS {
  todos: TODO_ITEM
  checked: boolean
  editTodo: (id: number, todo: string, isCompleted: boolean) => void
  deleteTodo: (id: number) => void
}

export interface SignInResponse {
  [access_token: string]: string
}

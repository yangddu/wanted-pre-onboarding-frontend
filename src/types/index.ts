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

export interface UPDATE_TODO {
  todo: string | any
  isCompleted: boolean
}

export interface TODO_MANAGER {
  modifyMode: boolean
  isCompleted: boolean
  value: string
}

export interface TODO_ITEM_PROPS {
  todos: TODO
  checked: boolean
  editTodo: (id: number, todoValue: UPDATE_TODO) => void
  deleteTodo: (id: number) => void
}

export interface SignInResponse {
  [access_token: string]: string
}

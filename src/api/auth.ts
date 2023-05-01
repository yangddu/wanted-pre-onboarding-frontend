import { AxiosResponse } from 'axios'
import { authInstance } from '../utils/axios'
import { SignInResponse } from '../types'

export const SignInTodo = (
  email: string,
  password: string
): Promise<AxiosResponse<SignInResponse>> =>
  authInstance.post(`/auth/signin`, {
    email,
    password
  })

export const SignUpTodo = (email: string, password: string) =>
  authInstance.post(`/auth/signup`, {
    email,
    password
  })

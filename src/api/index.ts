import { authInstance } from "../utils/axios";

export const SignInTodo = (email: string, password: string): Promise<any> =>
  authInstance.post(`/auth/signin`, {
    email,
    password
  });

export const SignUpTodo = (email: string, password: string): Promise<any> =>
  authInstance.post(`/auth/signup`, {
    email,
    password
  });

export const GetTodo = () => authInstance.get(`/todos`);

export const AddTodo = (todo: string): Promise<any> =>
  authInstance.post(`/todos`, {
    todo
  });

export const EditTodo = (
  id: number,
  todo: string,
  isCompleted: boolean
): Promise<any> =>
  authInstance.put(`/todos/${id}`, {
    todo,
    isCompleted
  });

export const DeleteTodo = (id: number): Promise<any> =>
  authInstance.delete(`/todos/${id}`);

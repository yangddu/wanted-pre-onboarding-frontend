import TodoItem from '../components/TodoItem'
import { todoRegEx } from '../utils/regex'
import { TODO, UPDATE_TODO } from '../types'
import useTodo from '../hooks/useTodo'
import useTodoUpdater from '../hooks/useTodoUpdater'
import { BsPlusCircleFill } from 'react-icons/bs'
import '../style/Todo.scss'

const Todo = () => {
  const { todos, setTodos, todo, handleCreate, handleChange } = useTodo()

  // const editTodo = (id: number, todoValue: UPDATE_TODO) => {
  //   updateTodoAPI(id, todoValue)
  //     .then(res => {
  //       if (res.status === 200) {
  //         // getTodo()
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  return (
    <div>
      <div className="todo-wrapper">
        <h1 className="title">Todo List</h1>
        <form onSubmit={handleCreate}>
          <div className="input-wrapper">
            <input
              id="todo"
              name="todo"
              data-testid="new-todo-input"
              value={todo}
              onChange={handleChange}
            />
            <button
              data-testid="new-todo-add-button"
              type="submit"
              className="plus-btn"
              disabled={todoRegEx(todo)}
            >
              <BsPlusCircleFill />
            </button>
          </div>
        </form>
        <ul>
          {todos.map((todoItem: TODO) => (
            <TodoItem
              todos={todos}
              todoItem={todoItem}
              key={todoItem.id}
              checked={todoItem.isCompleted}
              deleteTodo={() => {
                setTodos(todos.filter(todo => todo.id !== todoItem.id))
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todo

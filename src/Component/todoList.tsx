
import React from 'react'

// Import TodoItem
import TodoItem from './todoItem'

// Import interfaces
import { TodoListInterface } from '../Interface/todo.inteface'

// TodoList component
const TodoList = (props: TodoListInterface) => {
  return (
    <div className="todo-list">
      <ul>
        {props.todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              handleTodoUpdate={props.handleTodoUpdate}
              handleTodoRemove={props.handleTodoRemove}
              handleTodoComplete={props.handleTodoComplete}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
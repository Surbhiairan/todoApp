import React, {useState, useEffect} from 'react'

// Import components
import TodoForm from './Component/todoForm'
import TodoList from './Component/todoList'

// Import interfaces
import { TodoInterface } from './Interface/todo.inteface'

import './App.css'

const App = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([])
  const [completeTodos, setComplete] = useState<TodoInterface[]>([])

  function localStorage_hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null
}

  useEffect(() => {
    let storedTodos: any[]
    let storedComplete: any[]
    if(localStorage_hasItem('todos')) {
      storedTodos = JSON.parse(localStorage.getItem('todos') || '')
      const newTodos: TodoInterface[] = [...storedTodos]
      setTodos(newTodos)
    }
    if(localStorage_hasItem('completedTodo')) {
      storedComplete = JSON.parse(localStorage.getItem('completedTodo') || '')
      const newTodos: TodoInterface[] = [...storedComplete]
      setComplete(newTodos)
    }
  }, [])

  // Creating new todo item
  function handleTodoCreate(todo: TodoInterface) {
    const newTodosState: TodoInterface[] = [...todos]
    newTodosState.push(todo)
    setTodos(newTodosState)
    localStorage.setItem('todos', JSON.stringify(newTodosState))
  }

  // Update existing todo item
  function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: number) {
    const newTodosState: TodoInterface[] = [...todos]
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = event.target.value
    setTodos(newTodosState)
    
  }

  // Remove existing todo item
  function handleTodoRemove(id: number) {
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)
    setTodos(newTodosState)
    localStorage.setItem('todos', JSON.stringify(newTodosState))
  }

  function handleTodoRemoveComplete(id: number) {
    const newTodosState: TodoInterface[] = completeTodos.filter((todo: TodoInterface) => todo.id !== id)
    setComplete(newTodosState)
    localStorage.setItem('completedTodo', JSON.stringify(newTodosState))
  }

  // Check existing todo item as completed
  function handleTodoComplete(id: number) {
    const newTodosState: TodoInterface[] = [...todos, ...completeTodos]
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted = !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted
    
    const pendingTodo: TodoInterface[] = newTodosState.filter((todo: TodoInterface) => todo.isCompleted === false)
    setTodos(pendingTodo)
    localStorage.setItem('todos', JSON.stringify(pendingTodo))
    const newCompleteTodos: TodoInterface[] = newTodosState.filter((todo: TodoInterface) => todo.isCompleted === true)
    setComplete(newCompleteTodos)
    localStorage.setItem('completedTodo', JSON.stringify(newCompleteTodos))

  }


  return (
    <div className="todo-list-app">
      <TodoForm
        todos={todos}
        handleTodoCreate={handleTodoCreate}
      />

      <TodoList
        todos={todos}
        handleTodoUpdate={handleTodoUpdate}
        handleTodoRemove={handleTodoRemove}
        handleTodoComplete={handleTodoComplete}
      />
      {completeTodos && (
        <>
          <h2> {completeTodos.length ? 'Completed List' : ''} </h2>
          <TodoList
            todos={completeTodos}
            handleTodoUpdate={handleTodoUpdate}
            handleTodoRemove={handleTodoRemoveComplete}
            handleTodoComplete={handleTodoComplete}
          />
        </>
      ) }
    </div>
  )
}

export default App
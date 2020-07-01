import * as React from 'react'

// Import interfaces
import {TodoInterface, TodoFormInterface} from '../Interface/todo.inteface'

// Todo form component
const TodoForm = (props: TodoFormInterface) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [formState, setFormState] = React.useState('')

  // Handle todo input change
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Update form state with the text from input
    setFormState(event.target.value)
  }

  // Handle 'Enter' in todo input
  function handleInputEnter(event: React.KeyboardEvent) {
    // Check for 'Enter' key
    if (event.key === 'Enter') {
      // Prepare new todo object
      const newTodo: TodoInterface = {
        id: Math.floor(Math.random() * 100000),
        text: formState,
        isCompleted: false
      }

      props.handleTodoCreate(newTodo)

      // Reset the input field
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  //handle submit button
  function handleSumit() {
    
      const newTodo: TodoInterface = {
        id: Math.floor(Math.random() * 100000),
        text: formState,
        isCompleted: false
      }

      props.handleTodoCreate(newTodo)

      // Reset the input field
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
  }

  return (
    <div className="todo-form">
      <input
        ref={inputRef}
        type="text"
        placeholder='Enter new todo'
        onChange={event => handleInputChange(event)}
        onKeyPress={event => handleInputEnter(event)}
      />
      <button onClick={() => handleSumit()}>
          Add Todo
      </button>
    </div>
  )
}

export default TodoForm
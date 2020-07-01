// Todo interface
export interface TodoInterface {
    id: number;
    text: string;
    isCompleted: boolean;
  }
  
  // Todo form interface
  export interface TodoFormInterface {
    todos: TodoInterface[];
    handleTodoCreate: (todo: TodoInterface) => void;
  }
  
  // Todo list interface
  export interface TodoListInterface {
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
    handleTodoRemove: (id: number) => void;
    handleTodoComplete: (id: number) => void;
    todos: TodoInterface[]
  }
  
  // Todo item interface
  export interface TodoItemInterface {
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
    handleTodoRemove: (id: number) => void;
    handleTodoComplete: (id: number) => void;
    todo: TodoInterface;
  }
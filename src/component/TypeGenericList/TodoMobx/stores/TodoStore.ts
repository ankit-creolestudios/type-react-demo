import { action, computed, makeObservable, observable } from "mobx";

export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoStore {
  @observable public todos: ITodo[] = [
    { id: 1, text: "todo 1", completed: true },
    { id: 2, text: "todo 2", completed: false },
    { id: 3, text: "todo 3", completed: false },
  ];

  @action addTodo = (todo: ITodo) => {
    this.todos.push(todo);
    console.log(this.todos);
  };
  @action togleTodo = (id: number) => {
    const updatedTodos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.todos = updatedTodos;
  };
  @action updateTodo = (updatedTodo: ITodo) => {
    const updatedTodos = this.todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return { ...updatedTodo };
      }
      return todo;
    });
    this.todos = updatedTodos;
  };
  @action removeTodo = (id: number) => {
    const updatedTodos = this.todos.filter((todo) => todo.id !== id);
    this.todos = updatedTodos;
  };
  @computed
  get completedTask() {
    return this.todos.filter((todo) => todo.completed);
  }
  @computed
  get inCompletedTask() {
    return this.todos.filter((todo) => !todo.completed);
  }
  constructor() {
    makeObservable(this);
  }
}

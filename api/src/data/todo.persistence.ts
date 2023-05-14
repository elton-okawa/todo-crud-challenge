import { TodoEntity } from './todo.entity';

const todos: TodoEntity[] = [];

export async function createTodo(todo: Partial<TodoEntity>) {
  const entity = new TodoEntity(todo);
  todos.push(entity);
  return entity;
}

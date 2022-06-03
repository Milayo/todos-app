import React, { useState } from "react";
import Todo from "./Todos-item";
import { Wrapper, Button } from "./Todos-page-styles";

export interface TodoProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  onDoubleClick: (id: number) => void;
}

const TodoPage: React.FC<TodoProps> = () => {
  const [todos, setTodos] = useState<TodoProps[] | any>([]);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    fetchTodos();
  };

  const DeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo: TodoProps) => id !== todo.id);
    setTodos(newTodos);
  };

  return (
    <Wrapper>
      {error && alert(error)}
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <div className="todos">
          <h2>My Todos</h2>
          {todos.map((todo: TodoProps) => (
            <Todo
              id={todo.id}
              userId={todo.userId}
              key={todo.id}
              completed={todo.completed}
              title={todo.title}
              onDoubleClick={() => DeleteTodo(todo.id)}
            />
          ))}
        </div>
      )}
      {!todos.length && !loading && (
        <Button onClick={handleButtonClick}>FETCH TODOS</Button>
      )}
    </Wrapper>
  );
};

export default TodoPage;

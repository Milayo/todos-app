import React, { useState } from "react";
import Todo from "./Todos-item";
import { toast } from "react-toastify";

export interface TodoProps {
  id: number;
  title: string;
  completed: boolean;
  onClick: () => void;
  onDoubleClick: (id: number) => void;
}

const TodoPage: React.FC<TodoProps> = () => {
  const [todos, setTodos] = useState<TodoProps[] | any>([]);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);

  const ToastInfo = () => {
    return (
      <>
        <div>Name: Ijarotimi Ayomi</div>
        <div>email: sjhjhce</div>
      </>
    );
  };

  const notify = (id: number) =>
    toast.info(<ToastInfo />, {
      toastId: id,
      theme: "dark",
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
      console.log(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const handleButtonClick = () => {
    fetchTodos();
    setShow(false);
  };

  const DeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo: TodoProps) => id !== todo.id);
    console.log(newTodos);
    setTodos(newTodos);
  };

  return (
    <div className="todopage">
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <div>
          <h2>
            {todos.map((todo: TodoProps) => (
              <Todo
                id={todo.id}
                key={todo.id}
                completed={todo.completed}
                title={todo.title}
                onClick={() => notify(todo.id)}
                onDoubleClick={() => DeleteTodo(todo.id)}
              />
            ))}
          </h2>
        </div>
      )}
      {show && <button onClick={handleButtonClick}>FETCH TODOS</button>}
    </div>
  );
};

export default TodoPage;

import React, { useState } from "react";
import { MdPersonPin } from "react-icons/md";
import { toast } from "react-toastify";
import { TodoProps } from "./Todos-page";
import { TodoItem } from "./Todos-item-styles";

type ToastProps = {
  name: string;
  email: string;
};

const ToastInfo = ({ name, email }: ToastProps) => {
  return (
    <>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
    </>
  );
};

const notify = (id: number, name?: string, email?: string) =>
  toast.info(<ToastInfo name={name} email={email} />, {
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

const Todo: React.FC<TodoProps> = ({
  id,
  userId,
  title,
  onClick,
  onDoubleClick
}) => {
  const [error, setError] = useState<any>();

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const data = await response.json();
      console.log(data);
      notify(id, data?.name, data?.email);
    } catch (error) {
      setError(error);
    }
  };

  const handleClick = () => {
    fetchUserData();
  };

  return (
    <>
      {error && alert(error)}
      <TodoItem onDoubleClick={() => onDoubleClick(id)}>
        <p>{title}</p>
        <div className="icon">
          <MdPersonPin onClick={handleClick} />
        </div>
      </TodoItem>
    </>
  );
};

export default Todo;

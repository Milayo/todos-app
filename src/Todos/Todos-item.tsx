import React from "react";
import { TodoProps } from "./Todos-page";

const Todo: React.FC<TodoProps> = ({ id, title, onClick, onDoubleClick }) => {
  return (
    <li onClick={onClick} onDoubleClick={() => onDoubleClick(id)}>
      {title}
    </li>
  );
};

export default Todo;

import React from "react";
import { MdPersonPin } from "react-icons/md";
import { TodoProps } from "./Todos-page";
import { TodoItem } from "./Todos-item-styles";

const Todo: React.FC<TodoProps> = ({ id, title, onClick, onDoubleClick }) => {
  return (
    <TodoItem onClick={onClick} onDoubleClick={() => onDoubleClick(id)}>
      <p>{title}</p>
      <div>
        <MdPersonPin />
      </div>
    </TodoItem>
  );
};

export default Todo;

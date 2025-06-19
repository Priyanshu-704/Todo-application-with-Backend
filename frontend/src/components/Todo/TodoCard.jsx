import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import "./TodoCard.css";
const TodoCard = ({ title, description,dueDate, id, delid, displayBox }) => {
  const handleDelete = () => {
    delid(id);
  };

  return (
    <div className="p-3 todo-card">
      <div className="todo-card-content">
        <h3 className="todo-card-title">{title}</h3>
        <p className="todo-card-description">
          {description.length > 77
            ? `${description.substring(0, 77)}...`
            : description}
        </p>
        <p>
          <strong>Due:</strong> {new Date(dueDate).toLocaleString()}
        </p>
      </div>
      <div className="d-flex justify-content-around todo-card-actions">
        <div
          className="d-flex justify-content-center align-items-center px-3 py-2 todo-card-btn todo-card-update"
          onClick={() => {
            displayBox("block");
          }}
        >
          <GrDocumentUpdate className="todo-card-icon" /> Update
        </div>
        <div
          className="d-flex justify-content-center align-items-center px-3 py-2 text-danger todo-card-btn todo-card-delete"
          onClick={handleDelete}
        >
          <AiFillDelete className="todo-card-icon " />
          Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCard;

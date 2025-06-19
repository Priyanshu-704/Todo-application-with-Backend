import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import "./TodoCard.css";
import { toast } from "react-toastify";
const TodoCard = ({
  title,
  description,
  dueDate,
  isCompleted,
  id,
  delid,
  displayBox,
  toggleComplete,
  currentFilter,
}) => {
  const handleDelete = () => {
    delid(id);
  };

  const handleUpdateClick = () => {
    if (isCompleted) {
      toast.info("Completed tasks cannot be updated.");
    } else {
      displayBox("block");
    }
  };
  return (
    <div
      className={`p-3 todo-card ${
        isCompleted && currentFilter === "all" ? "completed-task" : ""
      }`}
    >
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
        <div className="form-check mt-2">
          {!isCompleted && (
            <button
              className="todo-complete-btn"
              onClick={() => toggleComplete(id)}
            >
              Mark as Completed
            </button>
          )}
          {isCompleted && (
            <button className="todo-complete-btn" disabled>
              Completed
            </button>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-around todo-card-actions">
        <div
          className={`d-flex justify-content-center align-items-center px-3 py-2 todo-card-btn todo-card-update ${
            isCompleted ? "disabled-update-btn" : ""
          }`}
          onClick={handleUpdateClick}
          style={{ cursor: "pointer" }}
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

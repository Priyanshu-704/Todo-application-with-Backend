import React from "react";
import TodoCard from "./TodoCard";

const SmartPlan = ({
  tasks,
  filter,
  handleUpdate,
  handleDelete,
  toggleComplete,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="no-tasks-msg text-danger fs-4 fw-bold text-center mt-4">
        ❗ No tasks for today in your Smart Plan
      </div>
    );
  }

  const filtered = tasks.filter((item) => {
    if (filter === "all") return true;
    if (filter === "completed") return item.isCompleted;
    if (filter === "pending") return !item.isCompleted;
    return true;
  });

  return (
    <div className="todo-grid">
      {filtered.map((item, index) => (
        <div className=" todo-card-wrapper" key={index}>
          <TodoCard
            title={item.title}
            description={item.description}
            dueDate={item.dueDate}
            priority={item.priority}
            id={item._id}
            isCompleted={item.isCompleted}
            delid={handleDelete}
            displayBox={() => handleUpdate(index)}
            toggleComplete={toggleComplete}
            currentFilter={filter}
          />
        </div>
      ))}
    </div>
  );
};

export default SmartPlan;

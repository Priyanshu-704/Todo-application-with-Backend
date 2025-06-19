import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import "./Todo.css";
import TodoCard from "./TodoCard";
import { ToastContainer, toast } from "react-toastify";
import Update from "./Update";
import { useSelector } from "react-redux";

const Todo = () => {
  const id = sessionStorage.getItem("id");
  const [showTextarea, setShowTextarea] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [array, setArray] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const fetchTasks = async () => {
    if (id) {
      try {
        const response = await axiosInstance.get(`/v2/gettask/${id}`);
        setArray(response.data.list);
        console.log("Fetched tasks:", response.data.list);
      } catch {
        toast.error("Failed to fetch tasks");
      }
    }
    
  };

  const handleShow = () => {
    setShowTextarea(true);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      inputs.title === "" ||
      inputs.description === "" ||
      inputs.dueDate === ""
    ) {
      toast.error("Title, Description and Due date can not be empty ");
    } else {
      if (id) {
        await axiosInstance
          .post("/v2/addtask", {
            title: inputs.title,
            description: inputs.description,
            dueDate: inputs.dueDate,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });
        fetchTasks();

        setInputs({ title: "", dueDate: "", description: "" });
        toast.success("Your task is added");
      }
      //  else {
      //   setArray([...array, inputs]);

      //   toast.warning(
      //     "Your task is added locally but not saved! Please sign up"
      //   );
      // }
      setShowTextarea(false);
    }
  };

  const handleDelete = async (CardId) => {
    if (id) {
      await axiosInstance
        .delete(`/v2/deletetask/${CardId}`, {
          data: { id: id },
        })
        .then(() => {
          toast.success("Your task is deleted");
        });
      fetchTasks();
    } else {
      toast.error("please signup first");
    }
  };

  const toggleUpdateModal = (show) => {
    setShowUpdateModal(show);
  };

  const handleUpdate = (index) => {
    setSelectedTask(array[index]);

    toggleUpdateModal(true);
  };

  const handleUpdateSuccess = () => {
    fetchTasks();
    setShowUpdateModal(false);
  };

  const handleToggleComplete = async (taskId) => {
    try {
      await axiosInstance.put(`/v2/togglecomplete/${taskId}`);
      
      fetchTasks();
    } catch {
      toast.error("Could not toggle task status");
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!isLoggedIn) {
      setArray([]);
    }
  }, [isLoggedIn]);
  return (
    <>
      <div className="todo-app ">
        <ToastContainer />
        <div className=" todo-container d-flex flex-column justify-content-center align-items-center">
          <div className=" todo-form-container  w-50 p-1">
            <form className="todo-input-group ">
              <input
                type="text"
                placeholder="TITLE"
                name="title"
                value={inputs.title}
                className="todo-title-input my-3 "
                onClick={handleShow}
                onChange={handlechange}
              />
              <input
                type="datetime-local"
                value={inputs.dueDate}
                className="todo-input-date"
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) =>
                  setInputs({ ...inputs, dueDate: e.target.value })
                }
                onClick={(e) => {
                  if (e.target.showPicker) e.target.showPicker();
                }}
              />
              <textarea
                type="text"
                placeholder="DESCRIPTION"
                value={inputs.description}
                style={{ display: showTextarea ? "block" : "none" }}
                name="description"
                className="todo-description-input "
                id="textarea"
                onChange={handlechange}
              />
            </form>
          </div>
          <div className="d-flex justify-content-end w-50 add-task-btn-div">
            <button className="todo-submit-btn " onClick={handleSubmit}>
              Add task
            </button>
          </div>
        </div>
        <div className="todo-filter-buttons">
          <div className="todo-filter-buttons">
            <button
              onClick={() => setFilter("all")}
              className={`todo-filter-btn todo-btn-all ${
                filter === "all" ? "active" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`todo-filter-btn todo-btn-pending ${
                filter === "pending" ? "active" : ""
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`todo-filter-btn todo-btn-completed ${
                filter === "completed" ? "active" : ""
              }`}
            >
              Completed
            </button>
          </div>

          <div className="todo-grid">
            {array &&
              array
                .filter((item) => {
                  if (filter === "all") return true;
                  if (filter === "completed") return item.isCompleted;
                  if (filter === "pending") return !item.isCompleted;
                  return true;
                })
                .map((item, index) => {
                  return (
                    <div className=" todo-card-wrapper" key={index}>
                      <TodoCard
                        title={item.title}
                        description={item.description}
                        dueDate={item.dueDate}
                        id={item._id}
                        isCompleted={item.isCompleted}
                        delid={handleDelete}
                        displayBox={() => handleUpdate(index)}
                        toggleComplete={handleToggleComplete}
                        currentFilter={filter} 
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      {showUpdateModal && (
        <div className="todo-update-modal" id="todo-update">
          <div className="container todo-update-content">
            <Update
              displayBox={() => toggleUpdateModal(false)}
              update={selectedTask}
              onUpdateSuccess={handleUpdateSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;

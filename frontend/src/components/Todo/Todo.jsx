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
  });
  const [array, setArray] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const fetchTasks = async () => {
    if (id) {
      try {
        const response = await axiosInstance.get(
          `/v2/gettask/${id}`
        );
        setArray(response.data.list);
        
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
    if (inputs.title === "" || inputs.description === "") {
      toast.error("Title and Description can not be empty ");
    } else {
      if (id) {
        await axiosInstance
          .post("/v2/addtask", {
            title: inputs.title,
            description: inputs.description,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });
        fetchTasks();

         setInputs({ title: "", description: "" });
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
            <div className="todo-input-group ">
              <input
                type="text"
                placeholder="TITLE"
                name="title"
                value={inputs.title}
                className="todo-title-input my-3 "
                onClick={handleShow}
                onChange={handlechange}
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
            </div>
          </div>
          <div className="d-flex justify-content-end w-50 add-task-btn-div">
            <button className="todo-submit-btn " onClick={handleSubmit}>
              Add task
            </button>
          </div>
        </div>
        <div className="todo-list-conatiner">
          <div className="todo-grid">
            {array &&
              array.map((item, index) => {
                return (
                  <div className=" todo-card-wrapper" key={index}>
                    <TodoCard
                      title={item.title}
                      description={item.description}
                      id={item._id}
                      delid={handleDelete}
                      displayBox={() => handleUpdate(index)}
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

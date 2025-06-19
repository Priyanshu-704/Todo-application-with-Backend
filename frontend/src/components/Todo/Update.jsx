import axiosInstance from "../../api/axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Update.css"

const Update = ({ displayBox, update,  onUpdateSuccess }) => {
  useEffect(() => {
    setInputs({
      title: update.title,
      description: update.description,
    });
  }, [update]);

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async () => {
    await axiosInstance
      .put(`/v2/updatetask/${update._id}`, inputs)
      .then(() => {
        toast.success("Task is updated")
      });
       onUpdateSuccess()
    displayBox("none");
  };

  const handleClose = () => {
    displayBox("none");
  };
  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update-modal-content">
      <h3 className="update-title">Update your task</h3>
      <input
        type="text"
        name="title"
        className="update-input my-4 w-100 p-3"
        value={inputs.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        className="update-input w-100 p-3"
        value={inputs.description}
        onChange={handleChange}
      />
      <div className="update-actions">
        <button className="update-btn update-btn-primary " onClick={handleSubmit}>
          UPDATE
        </button>
        <button className="update-btn update-btn-primary" onClick={handleClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default Update;

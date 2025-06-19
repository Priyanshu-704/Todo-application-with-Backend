import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container d-flex  justify-content-center align-items-center">
      <div className="container about-content">
        <div className="d-flex about-header">
          <h1 className="about-title">About Us</h1>
        </div>
        <p className="about-description">
          Todo App is your all-in-one digital assistant for managing daily tasks
          and staying organized in the most efficient way possible. Whether
          you're a student juggling assignments, a professional handling
          multiple projects, or simply someone trying to structure their day
          better, Todo App is designed to make your life easier. The app
          provides a clean, intuitive interface that allows users to create,
          update, and delete tasks effortlessly. You can enter a task title,
          give it a detailed description, and categorize your tasks for better
          clarity. <br />
          All your tasks appear neatly in a responsive grid layout, ensuring
          they’re easy to view, prioritize, and interact with. The app is built
          with flexibility in mind — even if you're not signed in, you can still
          create tasks locally and try out the full functionality. Once you
          create an account and log in, your tasks are securely stored in the
          cloud and automatically synced, so you can access them from any
          device, anywhere. <br />
          Todo App is not just a tool — it's a productivity companion that grows
          with you. From personal to-do lists and shopping reminders to
          work-related deadlines and collaborative plans, this app has the
          capability to handle it all. You can click to edit any task, make
          changes on the go, and delete completed or irrelevant ones with a
          single tap. Every action is supported with real-time feedback through
          toast notifications, ensuring a smooth and responsive user experience.
        </p>
      </div>
    </div>
  );
};

export default About;

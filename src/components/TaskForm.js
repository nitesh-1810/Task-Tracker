import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState("");

  const hangleChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(taskName);
    setTaskName("");
  };

  return (
    <div className="taskForm">
      {/* {console.log("taskName : ", taskName)} */}
      <form onSubmit={handleSubmit}>
        <button type="submit">+</button>
        <input
          type="text"
          onChange={hangleChange}
          value={taskName}
          placeholder="Assign Task..."
        />
      </form>
    </div>
  );
};

export default TaskForm;

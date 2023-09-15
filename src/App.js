import { useEffect, useState } from "react";
import "./App.css";
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";

function App() {
  const [task, setTask] = useState([]);

  useEffect(() => {
    // console.log("App useEffect", task);
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    // setTask(tasks); // localstorage return null value, through error.
    setTask(tasks === null ? [] : tasks); // use ternary because when first time app render on browser, localstorage return null value, which through error
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const addTask = (name) => {
    setTask((prev) => {
      return [...prev, { asign: name, done: false }];
    });
  };

  const updateTaskDone = (taskIndex, newDone) => {
    setTask((prev) => {
      const newTask = [...prev];
      newTask[taskIndex].done = newDone;
      return newTask;
    });
  };

  const removeTask = (indexToRemove) => {
    setTask((prev) => prev.filter((item, index) => index !== indexToRemove));
  };

  const onEdit = (evn, index) => {
    setTask((prev) => {
      const edited = [...prev];
      edited[index].asign = evn.target.value;
      return edited;
    });
  };

  const taskCmplt = task !== null && task.filter((item) => item.done);
  // error when localStorage is empty it throug error .http://localhost:3000/ run in incognato mode.

  const getMessage = () => {
    const taskPercentage = (taskCmplt.length / task.length) * 100;

    let message = "";
    // console.log(taskPercentage);

    switch (taskPercentage) {
      case 0:
        message = "Start your Work 🚴‍♀️";
        break;
      case 50:
        message = "Great work 💪";
        break;
      case 100:
        message = "Nice job for today 🏋️‍♂️";
        break;
      default:
        message = "Keep it going 🧗‍♂️";
    }

    return message;
  };

  return (
    <main>
      <h1>
        {taskCmplt.length}/{task.length} Complete
      </h1>
      <h2>{task.length === 0 ? "Assign Some work 📚" : getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {task.map((item, index) => (
        /* <Tasks key={index} {...item}></Tasks> */
        <Tasks
          key={index}
          tasks={item}
          onToggle={(updatedDone) => updateTaskDone(index, updatedDone)}
          onTrash={() => removeTask(index)}
          onEdit={(ev) => onEdit(ev, index)}
        />
      ))}
    </main>
  );
}

export default App;

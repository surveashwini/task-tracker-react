import { FaTimes } from "react-icons/fa";

const Task = ({ task, deleteTask, toggleReminder }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={toggleReminder}
    >
      <h3>
        {task.text}
        <FaTimes style={{ color: "red" }} onClick={deleteTask} />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;

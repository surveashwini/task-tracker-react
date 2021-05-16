import Task from "../../elements/Task/Task";

const Tasks = ({ tasks, addTask, deleteTask, toggleReminder }) => {
  return tasks.map((task) => (
    <div key={task.id}>
      <Task
        task={task}
        deleteTask={() => deleteTask(task.id)}
        toggleReminder={() => toggleReminder(task.id)}
      />
    </div>
  ));
};

export default Tasks;

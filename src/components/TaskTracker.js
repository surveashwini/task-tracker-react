import Header from "./Header";
import Tasks from "./Tasks";
import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import Footer from "./Footer";
import About from "./About";
import { BrowserRouter as Router, Route } from "react-router-dom";

const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/tasks");
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const addTask = async (task) => {
    const res = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const result = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await result.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...data, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div>
        <Header
          showAddTask={showAddTask}
          onAdd={() => setShowAddTask(!showAddTask)}
        />

        <Route
          path="/task-tracker-react/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask addTask={(task) => addTask(task)} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  deleteTask={deleteTask}
                  toggleReminder={toggleReminder}
                />
              ) : (
                "No tasks to show"
              )}
            </>
          )}
        />
        <Route path="/task-tracker-react/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default TaskTracker;

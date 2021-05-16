import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Tasks from "../Tasks/Tasks";
import AddTask from "../AddTask/AddTask";

import Header from "../../elements/Header/Header";
import Footer from "../../elements/Footer/Footer";
import About from "../../elements/About/About";

const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // use effect to fetch tasks from server
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // REST call to fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/tasks");
    const data = await res.json();
    return data;
  };

  // REST call to fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // REST call to add task
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

  // REST call to delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // REST call to toggle task's reminder
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

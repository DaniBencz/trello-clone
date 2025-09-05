import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import {
  getTasks,
  patchTask,
  postTask,
  deleteTask,
} from "../../services/taskService";
import AddTask from "./AddTask";
import BoardColumn from "./BoardColumn";

function log(message) {
  // mock logging to monitoring tool, e.g., Sentry, LogRocket
  console.log(`[Board] ${message}`);
}

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    // TODO add loading state
    const loadTasks = async () => {
      try {
        const items = await getTasks();
        setTasks(items);
      } catch (error) {
        log(error);
        alert("Failed to load tasks. Please try again.");
      }
    };
    loadTasks();
  }, []);

  const addTodoTask = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (taskName.trim() === "") return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      status: 0,
    };

    // Optimistic update
    setTasks((prevItems) => [...prevItems, newTask]);

    try {
      await postTask(newTask);
    } catch (error) {
      // Rollback on failure
      setTasks((prevItems) =>
        prevItems.filter((task) => task.id !== newTask.id)
      );
      log(error);
      alert("Failed to create task. Please try again.");
      return; // Keep the form open
    }

    setTaskName("");
    setTaskDescription("");
    setShowForm(false);
  };

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const closeModal = () => {
    setShowForm(false);
    setTaskName("");
    setTaskDescription("");
  };

  const removeTask = async (id) => {
    // Store the task before removing (for potential rollback)
    const taskToDelete = tasks.find((task) => task.id === id);

    // Optimistic update
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    try {
      await deleteTask(id);
    } catch (error) {
      // Rollback - restore the task to its original column
      if (taskToDelete) {
        setTasks((prev) => [...prev, taskToDelete]);
      }
      log(error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const updateTask = async (updatedTask) => {
    // Optimistic update
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

    try {
      await patchTask(updatedTask);
    } catch (error) {
      // Rollback on failure
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? task : task))
      );
      log(error);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <>
      <div
        className={`p-6 bg-gray-400 w-[80vw] max-w-3xl rounded-lg ${
          showForm ? "blur-sm" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Task Board</h1>
          <button
            onClick={addTodoTask}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:cursor-pointer"
          >
            Add Task
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700 hover:cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4">
          <BoardColumn
            title="To Do"
            tasks={tasks.filter((task) => task.status === 0)}
            deleteTask={removeTask}
            updateTask={updateTask}
          />
          <BoardColumn
            title="In Progress"
            tasks={tasks.filter((task) => task.status === 1)}
            deleteTask={removeTask}
            updateTask={updateTask}
          />
          <BoardColumn
            title="Done"
            tasks={tasks.filter((task) => task.status === 2)}
            deleteTask={removeTask}
            updateTask={updateTask}
          />
        </div>
      </div>

      {showForm && (
        <AddTask
          closeModal={closeModal}
          handleFormSubmit={handleFormSubmit}
          taskName={taskName}
          setTaskName={setTaskName}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
        />
      )}
    </>
  );
};

export default Board;

import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { createTask, getTasks, deleteTask } from "../../services/taskService";
import AddTask from "./AddTask";
import BoardColumn from "./BoardColumn";

const Board = () => {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    // TODO add loading state
    const loadTasks = async () => {
      const tasks = await getTasks();
      setToDoTasks(tasks.filter((task) => task.status === 0));
      setInProgressTasks(tasks.filter((task) => task.status === 1));
      setDoneTasks(tasks.filter((task) => task.status === 2));
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
    setToDoTasks((prevItems) => [...prevItems, newTask]);

    try {
      await createTask(newTask);
    } catch {
      // Rollback on failure
      setToDoTasks((prevItems) =>
        prevItems.filter((task) => task.id !== newTask.id)
      );
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
    const taskToDelete = [...toDoTasks, ...inProgressTasks, ...doneTasks].find(
      (task) => task.id === id
    );

    // Optimistic update
    setToDoTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setInProgressTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    setDoneTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    try {
      await deleteTask(id);
    } catch {
      // Rollback - restore the task to its original column
      if (taskToDelete) {
        if (taskToDelete.status === 0) {
          setToDoTasks((prev) => [...prev, taskToDelete]);
        } else if (taskToDelete.status === 1) {
          setInProgressTasks((prev) => [...prev, taskToDelete]);
        } else if (taskToDelete.status === 2) {
          setDoneTasks((prev) => [...prev, taskToDelete]);
        }
      }

      alert("Failed to delete task. Please try again.");
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
            tasks={toDoTasks}
            deleteTask={removeTask}
          />
          <BoardColumn
            title="In Progress"
            tasks={inProgressTasks}
            deleteTask={removeTask}
          />
          <BoardColumn title="Done" tasks={doneTasks} deleteTask={removeTask} />
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

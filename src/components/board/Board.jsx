import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import AddTask from "./AddTask";
import BoardColumn from "./BoardColumn";

const Board = () => {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const addTodoTask = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === "") return;

    setToDoTasks((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        status: 0,
      },
    ]);

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

  const deleteTask = (id) => {
    setToDoTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    setInProgressTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );

    setDoneTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
            deleteTask={deleteTask}
          />
          <BoardColumn
            title="In Progress"
            tasks={inProgressTasks}
            deleteTask={deleteTask}
          />
          <BoardColumn title="Done" tasks={doneTasks} deleteTask={deleteTask} />
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

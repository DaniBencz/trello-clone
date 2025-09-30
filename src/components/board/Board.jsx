import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "../../hooks/useTasks";
import TaskForm from "./TaskForm";
import BoardColumn from "./BoardColumn";
import Spinner from "../common/Spinner";
import ErrorState from "../common/ErrorState";

const Board = () => {
  const { data: tasks = [], isLoading, error, refetch } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openAddTask = () => setShowAddTask(true);

  const openEditTask = (task) => {
    setEditingTask(task);
    setShowEditTask(true);
  };

  const closeModal = () => {
    setShowAddTask(false);
    setShowEditTask(false);
    setEditingTask(null);
  };

  const handleCreateTask = (taskData) => {
    createTask.mutate({
      ...taskData,
      id: Date.now(),
      status: 0,
    });
    closeModal();
  };

  const handleUpdateTask = (taskData) => {
    updateTask.mutate({ ...editingTask, ...taskData });
    closeModal();
  };

  const handleDeleteTask = (id) => {
    deleteTask.mutate(id);
  };

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load tasks. Please try again."
        onRetry={() => refetch()}
        retryLabel="Retry"
      />
    );
  }

  return (
    <>
      <div
        className={`p-6 bg-gray-400 w-[99vw] md:w-[80vw] md:max-w-6xl rounded-lg ${
          showAddTask || showEditTask ? "blur-sm" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Task Board</h1>
          <button
            onClick={openAddTask}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div
          className="flex gap-4 md:gap-4 md:overflow-visible overflow-x-auto flex-nowrap snap-x snap-mandatory pb-4 -mx-4 px-4 scroll-smooth"
          aria-label="Task board columns"
        >
          <BoardColumn
            title="To Do"
            tasks={tasks.filter((task) => task.status === 0)}
            deleteTask={handleDeleteTask}
            updateTask={updateTask.mutate}
            openForm={openEditTask}
          />
          <BoardColumn
            title="In Progress"
            tasks={tasks.filter((task) => task.status === 1)}
            deleteTask={handleDeleteTask}
            updateTask={updateTask.mutate}
            openForm={openEditTask}
          />
          <BoardColumn
            title="Done"
            tasks={tasks.filter((task) => task.status === 2)}
            deleteTask={handleDeleteTask}
            updateTask={updateTask.mutate}
            openForm={openEditTask}
          />
        </div>
      </div>

      {showAddTask && (
        <TaskForm
          title="Add New Task"
          closeModal={closeModal}
          onSubmit={handleCreateTask}
        />
      )}
      {showEditTask && (
        <TaskForm
          title="Edit Task"
          closeModal={closeModal}
          onSubmit={handleUpdateTask}
          initialData={editingTask}
        />
      )}
    </>
  );
};

export default Board;

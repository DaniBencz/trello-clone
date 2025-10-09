import { useContext, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "../../hooks/useTasks";
import { TASK_STATUS, createNewTask } from "../../constants/taskConstants";
import TaskForm from "./TaskForm";
import BoardColumn from "./BoardColumn";
import Spinner from "../common/Spinner";
import ErrorState from "../common/ErrorState";
import Button from "../common/Button";

const Board = () => {
  const { data: tasks = [], isLoading, error, refetch } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const columns = useMemo(() => [
    {
      title: "To Do",
      tasks: tasks.filter(task => task.status === TASK_STATUS.TODO)
    },
    {
      title: "In Progress", 
      tasks: tasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS)
    },
    {
      title: "Done",
      tasks: tasks.filter(task => task.status === TASK_STATUS.DONE)
    }
  ], [tasks]);

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
    createTask.mutate(createNewTask(taskData.name, taskData.description));
    closeModal();
  };

  const handleUpdateTask = (taskData) => {
    updateTask.mutate({ ...editingTask, ...taskData });
    closeModal();
  };

  const handleDeleteTask = useCallback((id) => {
    deleteTask.mutate(id);
  }, [deleteTask]);

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
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`p-6 bg-gray-400 w-[99vw] md:w-[80vw] md:max-w-6xl rounded-lg ${
          showAddTask || showEditTask ? "blur-sm" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={openAddTask}
            className="rounded-md"
          >
            Add Task
          </Button>
          <Button
            onClick={handleLogout}
            variant="danger"
            className="rounded-md"
          >
            Logout
          </Button>
        </div>

        <div
          className="flex gap-4 md:gap-4 md:overflow-visible overflow-x-auto flex-nowrap snap-x snap-mandatory pb-4 -mx-4 px-4 scroll-smooth"
          aria-label="Task board columns"
        >
          {columns.map((column) => (
            <BoardColumn
              key={column.title}
              title={column.title}
              tasks={column.tasks}
              deleteTask={handleDeleteTask}
              updateTask={updateTask.mutate}
              openForm={openEditTask}
            />
          ))}
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
    </div>
  );
};

export default Board;

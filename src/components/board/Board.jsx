import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import useTaskBoard from "../../hooks/useTaskBoard";
import TaskForm from "./TaskForm";
import BoardHeader from "./BoardHeader";
import BoardColumn from "./BoardColumn";
import Spinner from "../common/Spinner";
import ErrorState from "../common/ErrorState";

const Board = () => {
  const {
    isLoading,
    error,
    refetch,
    columns,
    showAddTask,
    showEditTask,
    editingTask,
    openAddTask,
    openEditTask,
    closeModal,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    updateTaskMutation
  } = useTaskBoard();

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
        <BoardHeader onAddTask={openAddTask} onLogout={handleLogout} />

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
              updateTask={updateTaskMutation.mutate}
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

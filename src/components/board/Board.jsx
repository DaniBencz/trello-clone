import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import TaskForm from "./TaskForm";
import BoardColumn from "./BoardColumn";
import Task from "./Task";
import { useTaskManagement } from "../../hooks/useTaskManagement";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useTaskForm } from "../../hooks/useTaskForm";

const Board = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Custom hooks for clean separation of concerns
  const { tasks, updateTask, removeTask, addTask } = useTaskManagement();
  const { activeTask, sensors, handleDragStart, handleDragEnd } =
    useDragAndDrop(tasks, updateTask);
  const {
    showAddTask,
    showEditTask,
    taskName,
    taskDescription,
    setTaskName,
    setTaskDescription,
    openAddTask,
    openEditTask,
    closeModal,
    submitNewTask,
    submitEditTask,
  } = useTaskForm(addTask, updateTask);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSubmitEditTask = (e) => submitEditTask(e, tasks);

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

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            className="
              flex gap-4
              md:gap-4
              md:overflow-visible
              overflow-x-auto
              flex-nowrap
              snap-x snap-mandatory
              pb-4
              -mx-4 px-4
              scroll-smooth
            "
            aria-label="Task board columns"
          >
            <BoardColumn
              title="To Do"
              status={0}
              tasks={tasks.filter((task) => task.status === 0)}
              deleteTask={removeTask}
              updateTask={updateTask}
              openForm={openEditTask}
            />
            <BoardColumn
              title="In Progress"
              status={1}
              tasks={tasks.filter((task) => task.status === 1)}
              deleteTask={removeTask}
              updateTask={updateTask}
              openForm={openEditTask}
            />
            <BoardColumn
              title="Done"
              status={2}
              tasks={tasks.filter((task) => task.status === 2)}
              deleteTask={removeTask}
              updateTask={updateTask}
              openForm={openEditTask}
            />
          </div>

          <DragOverlay>
            {activeTask ? (
              <Task
                task={activeTask}
                deleteTask={() => {}}
                updateTask={() => {}}
                openForm={() => {}}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {showAddTask && (
        <TaskForm
          title="Add New Task"
          closeModal={closeModal}
          handleFormSubmit={submitNewTask}
          taskName={taskName}
          setTaskName={setTaskName}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
        />
      )}

      {showEditTask && (
        <TaskForm
          title="Edit Task"
          closeModal={closeModal}
          handleFormSubmit={handleSubmitEditTask}
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

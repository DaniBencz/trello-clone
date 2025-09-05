import Task from "./Task";

const BoardColumn = ({ title, tasks, deleteTask, updateTask }) => {
  return (
    <div className="flex-1 bg-white rounded p-4 shadow">
      <h2 className="font-semibold mb-4 text-gray-800">{title}</h2>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
};

export default BoardColumn;

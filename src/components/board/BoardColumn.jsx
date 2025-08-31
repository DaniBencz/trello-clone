import Task from "./Task";

const BoardColumn = ({ title, tasks, deleteTask }) => {
  return (
    <div className="flex-1 bg-white rounded p-4 shadow">
      <h2 className="font-semibold mb-4 text-gray-800">{title}</h2>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          name={task.name}
          description={task.description}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default BoardColumn;

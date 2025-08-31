import Task from "./Task";

const BoardColumn = ({ title, tasks }) => {
  return (
    <div className="flex-1 bg-white rounded p-4 shadow">
      <h2 className="font-semibold mb-4 text-gray-800">{title}</h2>
      {tasks.map((task, index) => (
        <Task key={index} name={task.name} description={task.description} />
      ))}
    </div>
  );
};

export default BoardColumn;

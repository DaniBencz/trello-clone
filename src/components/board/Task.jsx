const Task = ({ task, deleteTask }) => (
  <div className="bg-gray-100 p-4 rounded shadow mb-2">
    <button
      onClick={() => deleteTask(task.id)}
      className="mt-2 px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700 hover:cursor-pointer"
    >
      Delete
    </button>

    {task.status > 0 && (
      <button className="mt-2 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 hover:cursor-pointer">
        {`${"<"}`}
      </button>
    )}

    {task.status < 2 && (
      <button className="mt-2 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 hover:cursor-pointer">
        {`${">"}`}
      </button>
    )}

    <p className="text-gray-800">{task.name}</p>
    <p className="text-gray-800">{task.description}</p>
  </div>
);

export default Task;

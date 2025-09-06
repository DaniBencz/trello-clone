const Task = ({ task, deleteTask, updateTask, openForm }) => {
  const moveLeft = () => updateTask({ ...task, status: task.status - 1 });
  const moveRight = () => updateTask({ ...task, status: task.status + 1 });

  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-2">
      <div className="flex justify-between items-center">
        <div>
          {task.status > 0 && (
            <button
              className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 hover:cursor-pointer"
              onClick={moveLeft}
            >
              {`${"<"}`}
            </button>
          )}

          {task.status < 2 && (
            <button
              className="px-2 py-1 ml-1 text-white bg-blue-500 rounded hover:bg-blue-600 hover:cursor-pointer"
              onClick={moveRight}
            >
              {`${">"}`}
            </button>
          )}
        </div>

        <div>
          <button
            className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 hover:cursor-pointer"
            onClick={() => openForm(task.id)}
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="px-2 py-1 ml-1 text-white bg-red-500 rounded hover:bg-red-700 hover:cursor-pointer"
          >
            x
          </button>
        </div>
      </div>
      <p className="text-gray-800">{task.name}</p>
      <p className="text-gray-800">{task.description}</p>
    </div>
  );
};

export default Task;

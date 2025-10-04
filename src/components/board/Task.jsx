import Button from "../common/Button";

const Task = ({ task, deleteTask, updateTask, openForm }) => {
  const moveLeft = () => updateTask({ ...task, status: task.status - 1 });
  const moveRight = () => updateTask({ ...task, status: task.status + 1 });

  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-2">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-1">
          {task.status > 0 && (
            <Button size="small" onClick={moveLeft}>
              {`${"<"}`}
            </Button>
          )}

          {task.status < 2 && (
            <Button size="small" onClick={moveRight}>
              {`${">"}`}
            </Button>
          )}
        </div>

        <div>
          <Button size="small" onClick={() => openForm(task)} title="Edit">
            <i className="fa-regular fa-pen-to-square"></i>
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={() => deleteTask(task.id)}
            className="ml-1"
          >
            x
          </Button>
        </div>
      </div>
      <p className="mt-1 text-gray-800">{task.name}</p>
      <p className="text-gray-800">{task.description}</p>
    </div>
  );
};

export default Task;

import Button from "../common/Button";
import { TASK_STATUS } from "../../constants/taskConstants";

const Task = ({ task, deleteTask, updateTask, openForm }) => {
  const moveLeft = () => updateTask({ ...task, status: task.status - 1 });
  const moveRight = () => updateTask({ ...task, status: task.status + 1 });

  const canMoveLeft = task.status > TASK_STATUS.TODO;
  const canMoveRight = task.status < TASK_STATUS.DONE;

  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-2">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-1">
          {canMoveLeft && (
            <Button size="small" onClick={moveLeft} title="Move left">
              ←
            </Button>
          )}

          {canMoveRight && (
            <Button size="small" onClick={moveRight} title="Move right">
              →
            </Button>
          )}
        </div>

        <div>
          <Button size="small" onClick={() => openForm(task)} title="Edit">
            <i className="fa-regular fa-pen-to-square"></i>
          </Button>

          <Button
            title="Delete"
            size="small"
            variant="danger"
            onClick={() => deleteTask(task.id)}
            className="ml-1"
          >
            ×
          </Button>
        </div>
      </div>
      <p className="mt-1 text-gray-800">{task.name}</p>
      <p className="text-gray-800">{task.description}</p>
    </div>
  );
};

export default Task;

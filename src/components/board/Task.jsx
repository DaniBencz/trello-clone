import { useDraggable } from "@dnd-kit/core";

const Task = ({ task, deleteTask, updateTask, openForm }) => {
  const moveLeft = () => updateTask({ ...task, status: task.status - 1 });
  const moveRight = () => updateTask({ ...task, status: task.status + 1 });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : {};

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`bg-gray-100 p-4 rounded shadow mb-2 ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
      {...attributes}
    >
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-1">
          {task.status > 0 && (
            <button
              className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                moveLeft();
              }}
            >
              {`${"<"}`}
            </button>
          )}

          {task.status < 2 && (
            <button
              className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                moveRight();
              }}
            >
              {`${">"}`}
            </button>
          )}
        </div>

        <div>
          <button
            className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              openForm(task);
            }}
            title="Edit"
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button
            className="px-2 py-1 ml-1 text-white bg-red-500 rounded hover:bg-red-700 hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
          >
            x
          </button>
        </div>
      </div>
      
      {/* Drag handle area */}
      <div 
        className="cursor-grab active:cursor-grabbing"
        {...listeners}
      >
        <p className="mt-1 text-gray-800">{task.name}</p>
        <p className="text-gray-800">{task.description}</p>
      </div>
    </div>
  );
};

export default Task;

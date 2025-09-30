import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

const BoardColumn = ({ title, status, tasks, deleteTask, updateTask, openForm }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="snap-start w-[85%] sm:w-[50%] md:w-auto flex-shrink-0 md:flex-1 md:min-w-0 md:shrink">
      <div 
        ref={setNodeRef}
        className={`flex-1 bg-white rounded p-4 shadow transition-colors ${
          isOver ? 'bg-blue-50 border-2 border-blue-300' : ''
        }`}
      >
        <h2 className="font-semibold mb-4 text-gray-800">{title}</h2>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
            openForm={openForm}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;

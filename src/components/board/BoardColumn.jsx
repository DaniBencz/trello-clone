import Task from "./Task";

const BoardColumn = ({ title, tasks, deleteTask, updateTask, openForm }) => {
  return (
    <div className="snap-start w-[85%] sm:w-[50%] md:w-auto flex-shrink-0 md:flex-1 md:min-w-0 md:shrink">
      <div className=" flex-1 bg-white rounded p-4 shadow">
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

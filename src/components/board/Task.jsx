const Task = ({ name, description }) => (
  <div className="bg-gray-100 p-4 rounded shadow mb-2">
    <p className="text-gray-800">{name}</p>
    <p className="text-gray-800">{description}</p>
  </div>
);

export default Task;

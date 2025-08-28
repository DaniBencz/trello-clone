import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Task = () => (
  <div className="bg-gray-100 p-4 rounded shadow mb-2">
    <p className="text-gray-800">A Task</p>
  </div>
);

const Board = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 hover:cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Columns */}
      <div className="flex gap-4">
        {/* ToDo */}
        <div className="flex-1 bg-white rounded p-4 shadow">
          <h2 className="font-semibold mb-4 text-gray-800">ToDo</h2>
          <Task />
        </div>
        {/* In Progress */}
        <div className="flex-1 bg-white rounded p-4 shadow">
          <h2 className="font-semibold mb-4 text-gray-800">In Progress</h2>
          <Task />
        </div>
        {/* Done */}
        <div className="flex-1 bg-white rounded p-4 shadow">
          <h2 className="font-semibold mb-4">Done</h2>
          <Task />
        </div>
      </div>
    </div>
  );
};

export default Board;

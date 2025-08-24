import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: import from service layer
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <button
        onClick={() => setCount((count) => count + 1)}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Count is {count}
      </button>
    </div>
  );
};

export default Board;

import { useEffect, useState } from "react";
import Button from "../common/Button";

const TaskForm = ({ title, closeModal, onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name, description });
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-blue-100"
            required
          />
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-blue-100"
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              onClick={closeModal}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

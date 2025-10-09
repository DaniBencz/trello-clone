import Button from "../common/Button";

const BoardHeader = ({ onAddTask, onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Button onClick={onAddTask} className="rounded-md">
        Add Task
      </Button>
      <Button onClick={onLogout} variant="danger" className="rounded-md">
        Logout
      </Button>
    </div>
  );
};

export default BoardHeader;

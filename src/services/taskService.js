// mock async API calls to simulate CRUD server interactions
// TODO: error handling

export const createTask = async (task) => {
  const tasks = await getTasks();
  tasks.push(task);
  await saveTasks(tasks);
};

export const getTasks = () => {
  const tasks = localStorage.getItem("tasks");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks ? JSON.parse(tasks) : []);
    }, 300);
  });
};

export const updateTask = async (updatedTask) => {
  const tasks = await getTasks();
  const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
    await saveTasks(tasks);
  }
};

export const deleteTask = async (taskId) => {
  const tasks = await getTasks();
  const filteredTasks = tasks.filter((task) => task.id !== taskId);
  await saveTasks(filteredTasks);
};

const saveTasks = (tasks) => {
  // return Promise.reject(); // Simulate error to test Rollback strategy
  return new Promise((resolve) =>
    setTimeout(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      resolve();
    }, 300)
  );
};

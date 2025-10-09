export const TASK_STATUS = {
  TODO: 0,
  IN_PROGRESS: 1,
  DONE: 2
};

export const TASK_SHAPE = {
  id: null, 
  name: '',
  description: '',
  status: TASK_STATUS.TODO
};

export const createNewTask = (name, description, status = TASK_STATUS.TODO) => ({
  id: Date.now(),
  name: name.trim(),
  description: description.trim(),
  status
});

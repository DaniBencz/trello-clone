import { useState } from 'react';

export const useTaskForm = (addTask, updateTask) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const openAddTask = () => {
    setShowAddTask(true);
  };

  const openEditTask = (task) => {
    setEditingTaskId(task.id);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setShowEditTask(true);
  };

  const closeModal = () => {
    setShowAddTask(false);
    setShowEditTask(false);
    setEditingTaskId(null);
    setTaskName("");
    setTaskDescription("");
  };

  const submitNewTask = async (e) => {
    e.preventDefault();
    if (taskName.trim() === "") return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      status: 0,
    };

    try {
      await addTask(newTask);
      setTaskName("");
      setTaskDescription("");
      setShowAddTask(false);
    } catch {
      // Error already handled in addTask, keep the form open
    }
  };

  const submitEditTask = async (e, tasks) => {
    e.preventDefault();
    if (taskName.trim() === "") return;

    const updatedTask = {
      ...tasks.find((task) => task.id === editingTaskId),
      name: taskName,
      description: taskDescription,
    };

    await updateTask(updatedTask);

    setTaskName("");
    setTaskDescription("");
    setEditingTaskId(null);
    setShowEditTask(false);
  };

  return {
    showAddTask,
    showEditTask,
    taskName,
    taskDescription,
    setTaskName,
    setTaskDescription,
    openAddTask,
    openEditTask,
    closeModal,
    submitNewTask,
    submitEditTask,
  };
};
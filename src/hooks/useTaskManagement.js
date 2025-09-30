import { useState, useEffect } from 'react';
import { getTasks, patchTask, postTask, deleteTask } from '../services/taskService';
import log from '../services/logger';

export const useTaskManagement = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const items = await getTasks();
        setTasks(items);
      } catch (error) {
        log(error);
        alert("Failed to load tasks. Please try again.");
      }
    };
    loadTasks();
  }, []);

  const updateTask = async (updatedTask) => {
    const originalTask = tasks.find((task) => task.id === updatedTask.id);
    
    // Optimistic update
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

    try {
      await patchTask(updatedTask);
    } catch (error) {
      // Rollback on failure
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? originalTask : task
        )
      );
      log(error);
      alert("Failed to update task. Please try again.");
    }
  };

  const removeTask = async (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    
    // Optimistic update
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    try {
      await deleteTask(id);
    } catch (error) {
      // Rollback - restore the task
      if (taskToDelete) {
        setTasks((prev) => [...prev, taskToDelete]);
      }
      log(error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const addTask = async (newTask) => {
    // Optimistic update
    setTasks((prevItems) => [...prevItems, newTask]);

    try {
      await postTask(newTask);
    } catch (error) {
      // Rollback on failure
      setTasks((prevItems) =>
        prevItems.filter((task) => task.id !== newTask.id)
      );
      log(error);
      alert("Failed to create task. Please try again.");
      throw error; // Re-throw to handle in component
    }
  };

  return {
    tasks,
    updateTask,
    removeTask,
    addTask,
  };
};
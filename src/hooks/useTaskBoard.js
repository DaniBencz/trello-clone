import { useState, useMemo, useCallback } from 'react';
import { TASK_STATUS, createNewTask } from '../constants/taskConstants';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from './useTasks';

const useTaskBoard = () => {
  // Data layer
  const { data: tasks = [], isLoading, error, refetch } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  // UI state layer
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Computed state
  const columns = useMemo(() => [
    {
      title: "To Do",
      tasks: tasks.filter(task => task.status === TASK_STATUS.TODO)
    },
    {
      title: "In Progress",
      tasks: tasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS)
    },
    {
      title: "Done",
      tasks: tasks.filter(task => task.status === TASK_STATUS.DONE)
    }
  ], [tasks]);

  // UI actions
  const openAddTask = useCallback(() => setShowAddTask(true), []);

  const openEditTask = useCallback((task) => {
    setEditingTask(task);
    setShowEditTask(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowAddTask(false);
    setShowEditTask(false);
    setEditingTask(null);
  }, []);

  // Combined actions (data + UI)
  const handleCreateTask = useCallback((taskData) => {
    createTask.mutate(createNewTask(taskData.name, taskData.description));
    closeModal();
  }, [createTask, closeModal]);

  const handleUpdateTask = useCallback((taskData) => {
    updateTask.mutate({ ...editingTask, ...taskData });
    closeModal();
  }, [updateTask, editingTask, closeModal]);

  const handleDeleteTask = useCallback((id) => {
    deleteTask.mutate(id);
  }, [deleteTask]);

  return {
    // Data
    tasks,
    isLoading,
    error,
    refetch,
    columns,
    // UI state
    showAddTask,
    showEditTask,
    editingTask,
    // Actions
    openAddTask,
    openEditTask,
    closeModal,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    updateTaskMutation: updateTask
  };
};

export default useTaskBoard;

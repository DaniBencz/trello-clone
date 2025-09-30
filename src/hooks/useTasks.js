import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, postTask, patchTask, deleteTask } from "../services/taskService";

const TASKS_KEY = ["tasks"];

const createOptimisticHandlers = (queryClient, optimisticUpdater) => ({
  onMutate: async (data) => {
    await queryClient.cancelQueries({ queryKey: TASKS_KEY });
    const previousTasks = queryClient.getQueryData(TASKS_KEY);

    queryClient.setQueryData(TASKS_KEY, (old) => optimisticUpdater(old || [], data));

    return { previousTasks };
  },
  onError: (err, data, context) => {
    queryClient.setQueryData(TASKS_KEY, context.previousTasks);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: TASKS_KEY });
  },
});

export const useTasks = () => useQuery({
  queryKey: TASKS_KEY,
  queryFn: getTasks,
});

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTask,
    ...createOptimisticHandlers(
      queryClient,
      (tasks, newTask) => [...tasks, newTask]
    ),
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTask,
    ...createOptimisticHandlers(
      queryClient,
      (tasks, updatedTask) =>
        tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    ),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    ...createOptimisticHandlers(
      queryClient,
      (tasks, taskId) => tasks.filter(task => task.id !== taskId)
    ),
  });
};

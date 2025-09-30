import { useState } from 'react';
import { useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export const useDragAndDrop = (tasks, updateTask) => {
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    setActiveTask(null);
    
    if (!over) return;
    
    const taskId = active.id;
    const newStatus = parseInt(over.id);
    
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;
    
    updateTask({ ...task, status: newStatus });
  };

  return {
    activeTask,
    sensors,
    handleDragStart,
    handleDragEnd,
  };
};
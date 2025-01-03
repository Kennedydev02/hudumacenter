import { useState, useCallback } from 'react';
import { useTaskContext } from '../context/TaskContext';

export function useTask() {
  const { addTask, updateTask, deleteTask, tasks } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = useCallback((taskData) => {
    const newTask = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...taskData,
    };
    addTask(newTask);
  }, [addTask]);

  const handleUpdateTask = useCallback((taskData) => {
    updateTask({
      ...taskData,
      updatedAt: new Date().toISOString(),
    });
  }, [updateTask]);

  const handleDeleteTask = useCallback((taskId) => {
    deleteTask(taskId);
  }, [deleteTask]);

  return {
    tasks,
    selectedTask,
    setSelectedTask,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
  };
}
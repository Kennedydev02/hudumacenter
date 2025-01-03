import React, { createContext, useContext, useReducer } from 'react';
import { TASK_TYPES, TASK_STATUS } from '../constants/taskTypes';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const value = {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    addTask: (task) => {
      dispatch({ type: 'ADD_TASK', payload: task });
    },
    updateTask: (task) => {
      dispatch({ type: 'UPDATE_TASK', payload: task });
    },
    deleteTask: (taskId) => {
      dispatch({ type: 'DELETE_TASK', payload: taskId });
    },
    setLoading: (loading) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    },
    setError: (error) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    },
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
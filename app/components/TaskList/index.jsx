import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({ tasks, handleToggleTask, handleDeleteTask }) => {
  
  if (!Array.isArray(tasks)) {
    console.error('tasks is not an array', tasks);
    return null;
  }

  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem 
          key={index}
          index={index}
          task={task}
          handleToggleTask={handleToggleTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;

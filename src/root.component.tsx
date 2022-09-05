import { useEffect, useState } from 'react';

import { taskSubscription } from '@mf-app/utility';
import { List } from '@mui/material';

import DjangoTodo from './api/djangoTodo';
import TaskItem from './components/Task';
import type { DjangoTask, TaskUpdateRequest } from './types';

const Tasks = (): JSX.Element => {
  const [tasks, setTasks] = useState<DjangoTask[]>([]);

  const updateTask = async ({ id, text, completed }: TaskUpdateRequest): Promise<void> => {
    const item = await DjangoTodo.updateTask(id, { text, completed });
    setTasks((prevState) => {
      return prevState.map((task) => {
        if (id === task.id) {
          return { ...item };
        }
        return { ...task };
      });
    });
  };

  const deleteTask = async (id: number): Promise<void> => {
    await DjangoTodo.deleteTask(id);
    setTasks((prevState) => {
      return prevState.filter((task) => {
        return id !== task.id;
      });
    });
  };

  useEffect(() => {
    if (!tasks.length) {
      (async (): Promise<void> => {
        const data = await DjangoTodo.getTasks();
        setTasks(data.map((item) => ({ ...item })));
      })();
    }
  }, [tasks.length]);

  useEffect(() => {
    taskSubscription.subscribe((newTask) => {
      setTasks((prevState) => {
        return [...prevState, newTask];
      });
    });
  }, []);

  return (
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      ))}
    </List>
  );
};

export default Tasks;

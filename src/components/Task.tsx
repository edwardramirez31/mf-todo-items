import { useState } from 'react';

import { Edit, DeleteForever, Save } from '@mui/icons-material';
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  TextField,
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';

import type { DjangoTask, TaskUpdateRequest } from '../types';

interface Props extends DjangoTask {
  onUpdateTask: (arg: TaskUpdateRequest) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
}

const TaskItem: React.FC<Props> = ({ id, text: task, completed, onUpdateTask, onDeleteTask }) => {
  const [text, setText] = useState<string>(task);
  const [isUpdating, setIsUpdating] = useState(false);

  const textChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setText(event.target.value);
  };

  return (
    <ListItem button>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={completed}
          tabIndex={-1}
          disableRipple
          onClick={(): Promise<void> => onUpdateTask({ text, id, completed: !completed })}
        />
      </ListItemIcon>
      <ListItemText>
        {isUpdating ? (
          <TextField value={text} onChange={textChangeHandler} variant="standard" fullWidth />
        ) : (
          <Typography>{text}</Typography>
        )}
      </ListItemText>
      <ListItemSecondaryAction>
        {!isUpdating ? (
          <>
            <IconButton edge="end" onClick={(): void => setIsUpdating((prevState) => !prevState)}>
              <Edit color="primary" />
            </IconButton>
            <IconButton
              edge="end"
              sx={{ ml: '10px' }}
              onClick={(): Promise<void> => onDeleteTask(id)}
            >
              <DeleteForever color="error" />
            </IconButton>
          </>
        ) : (
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={(): void => {
              onUpdateTask({ text, id, completed });
              setIsUpdating((prevState) => !prevState);
            }}
          >
            <Save color="primary" />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;

import React from 'react';
import {Box, Button, TextField} from '@mui/material';
import HttpAuth from '../../../services/HttpAuthService';

const TaskForm = props => {
  const {navigation, row, method} = props || {};
  const [task, setTask] = React.useState(row?.task || '');
  const [desc, setDesc] = React.useState(row?.description || '');

  const saveTask = () => {
    HttpAuth[method](props?.api, {task, description: desc})
      .then(response => {
        navigation.navigate(-1);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const handleChange = event => {
    const {name, id, value} = event.target;
    console.log('name', id);
    if (id === 'task') {
      setTask(value);
    } else {
      setDesc(value);
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        gap: '10px',
      }}>
      <Box>{props?.header}</Box>
      <TextField
        id="task"
        label="Task"
        variant="standard"
        value={task}
        onChange={handleChange}
      />

      <TextField
        id="description"
        label="Description"
        variant="standard"
        value={desc}
        onChange={handleChange}
      />
      <Button
        onClick={() => {
          saveTask();
        }}>
        Save
      </Button>
    </Box>
  );
};

export const TaskAddForm = props => {
  return (
    <TaskForm {...props} method="post" header="Add task" api="/v1/tasks" />
  );
};

export const TaskEditForm = props => {
  const {row} = props?.params || {};
  return (
    <TaskForm
      {...props}
      method="put"
      row={row}
      header="Edit task"
      api={`/v1/tasks/${row?._id}`}
    />
  );
};

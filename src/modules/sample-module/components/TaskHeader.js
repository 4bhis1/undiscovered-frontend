import React from 'react';
import {Box, Button} from '@mui/material';

export const TaskHeader = props => {
  const {navigation} = props || {};
  return (
    <Box
      padding={'5px'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Box>Tasks</Box>
      <Button
        onClick={() => {
          navigation.navigate('task-add');
        }}>
        Add Task
      </Button>
    </Box>
  );
};

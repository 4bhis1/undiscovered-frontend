import React from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {TaskHeader} from '../components/TaskHeader';
import HttpAuth from '../../../services/HttpAuthService';

const TaskScreen = props => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    HttpAuth.get('/v1/tasks')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const onDeleteTask = id => {
    HttpAuth.delete(`/v1/tasks/${id}`)
      .then(response => {
        setData(data.filter(item => item._id !== id));
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  return (
    <Box>
      <TaskHeader {...props} />
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}}>
          <TableHead
            sx={{
              bgcolor: '#f5f5f5',
            }}>
            <TableRow>
              <TableCell>Task </TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow
                onClick={() => {
                  props.navigation.navigate('/task-edit', {row});
                }}
                style={{cursor: 'pointer'}}
                hover={true}
                key={row.task}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="row">
                  {row.task}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <Button
                    color="error"
                    onClick={e => {
                      e.stopPropagation();
                      onDeleteTask(row._id);
                    }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaskScreen;

import React, {useState} from 'react';
import {FaAnglesLeft, FaAnglesRight} from 'react-icons/fa6';
import {Button} from '../../components/Button';
import {useNavigate} from 'react-router-dom';
import {Modal} from '@mui/material';
import MainForm from '../../components/localeSwitcher/Form/Form';

export const ListMenu = ({data}) => {
  const [show, updateShow] = useState(true);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return show ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 4,
        paddingTop: 8,
        position: 'relative',
      }}>
      <div></div>
      {/* {data?.map((item, index) => (
        <div
          style={{padding: 10, border: '1px solid black', borderRadius: 10}}
          key={index}>
          <text>{item?.label}</text>
        </div>
      ))} */}
      <div style={{margin: 10}}>
        <Button title={'Start new Chat'} onClick={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <MainForm handleClose={handleClose} newChat/>
        </Modal>
      </div>

      <div
        style={{
          color: 'white',
          height: 30,
          width: 30,
          display: 'flex',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          // left: 10,
          bottom: 100,
          position: 'absolute',
          zIndex: 100,
          cursor: 'pointer',
        }}
        onClick={() => {
          updateShow(doc => {
            return !doc;
          });
        }}>
        <FaAnglesLeft />
      </div>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        paddingTop: 8,
        position: 'relative',
      }}>
      <div
        style={{
          color: 'white',
          height: 30,
          width: 30,
          display: 'flex',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          left: 0,
          bottom: 100,
          position: 'absolute',
          zIndex: 100,
          cursor: 'pointer',
        }}
        onClick={() => {
          updateShow(doc => {
            return !doc;
          });
        }}>
        <FaAnglesRight />
      </div>
    </div>
  );
};

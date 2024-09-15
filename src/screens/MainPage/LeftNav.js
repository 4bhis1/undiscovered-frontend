import React, {useEffect, useState} from 'react';
import {FaAnglesLeft, FaAnglesRight} from 'react-icons/fa6';
import {Button} from '../../components/Button';
import {useNavigate} from 'react-router-dom';
import {Modal} from '@mui/material';
import MainForm from '../../components/localeSwitcher/Form/Form';
import HttpAuth from '../../services/HttpAuthService';
import {showError} from '../../hooks/showError';

const useIndivisualUseState = ({itnaryId, setData}) => {
  HttpAuth.get(`/v1/itinerary/${itnaryId}`)
    .then(response => {
      setData(response);
    })
    .catch(error => {
      showError(error);
    });
};

export const ListMenu = ({setData, leftIndex, updateLeftIndex}) => {
  const [show, updateShow] = useState(true);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [userItinaries, updateUserIntinaries] = useState();

  useEffect(() => {
    HttpAuth.get('/v1/itinerary')
      .then(response => {
        updateUserIntinaries(response.itineraries);
      })
      .catch(error => {
        showError(error);
      });
  }, []);

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
      <div style={{margin: 10}}>
        <Button title={'Start new Chat'} onClick={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <MainForm handleClose={handleClose} newChat />
        </Modal>
      </div>
      <div
        style={{
          marginTop: 20,
          overflow: 'hidden',
          height: '80vh',
          overflowY: 'scroll',
        }}>
        {userItinaries &&
          userItinaries.map((doc, index) => {
            return (
              <div
                key={index}
                style={{
                  cursor: 'pointer',
                  padding: 15,
                  borderRadius: 10,
                  borderStyle: 'solid',
                  borderColor: '#c0c0c0',
                  borderWidth: 2,
                  margin: 10,
                  backgroundColor: leftIndex === index ? 'black' : 'white',
                  color: leftIndex === index ? 'white' : 'black',
                }}
                onClick={() => {
                  useIndivisualUseState({itnaryId: doc._id, setData});
                  updateLeftIndex(index);
                }}>
                {doc.destination}
              </div>
            );
          })}
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

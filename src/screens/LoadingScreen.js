import React from 'react';
import loader from '../assets/loader.gif';

export const LoadingScreen = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <img src={loader} />
    </div>
  );
};

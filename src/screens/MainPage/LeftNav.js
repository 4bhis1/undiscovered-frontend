import React, {useState} from 'react';
import {FaAnglesLeft, FaAnglesRight} from 'react-icons/fa6';

export const ListMenu = ({data}) => {
  const [show, updateShow] = useState(true);

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
      Create Your Account
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

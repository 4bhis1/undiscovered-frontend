import React from 'react';

export const ListMenu = ({data}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      gap: 4,
      margin: 2,
      paddingTop:8
    }}>
    {data?.map((item, index) => (
      <div
        style={{padding: 10, border: '1px solid black', borderRadius: 10}}
        key={index}>
        <text>{item?.label}</text>
      </div>
    ))}
  </div>
);

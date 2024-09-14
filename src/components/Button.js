import React from 'react';
import {Box} from '@radix-ui/themes';
import {IoMdArrowDropleft, IoMdArrowDropright} from 'react-icons/io';

export const Button = props => {
  const {onClick = () => {}, title} = props;
  return (
    <Box
      style={{
        borderRadius: '63px',
        boxShadow: '6px 6px 6px black',
        overflow: 'hidden',
        width: '150px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#A3F500',
        font: 'poppins',
        fontWeight: 400,
        fontSize: '15px',
        cursor: 'pointer',
      }}
      height="48px"
      onClick={onClick}>
      {title === 'Back' && <IoMdArrowDropleft />}
      {title}
      {title === 'Next' && <IoMdArrowDropright />}
    </Box>
  );
};

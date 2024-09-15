import React from 'react';
import {Box} from '@radix-ui/themes';
import {IoMdArrowDropleft, IoMdArrowDropright} from 'react-icons/io';
import {FaMagic} from 'react-icons/fa';

export const Button = props => {
  const {onClick = () => {}, title} = props;
  return (
    <Box
      style={{
        borderRadius: '63px',
        boxShadow: '0px 3px 0px black',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        width: '150px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: title === 'Back' ? '#ffffff' : '#A3F500',
        font: 'poppins',
        fontWeight: 400,
        fontSize: '15px',
        cursor: 'pointer',
        gap: 10,
      }}
      height="48px"
      onClick={onClick}>
      {title === 'Back' && <IoMdArrowDropleft />}
      {title === 'Lets Generate' && <FaMagic />}
      {title}
      {title === 'Next' && <IoMdArrowDropright />}
    </Box>
  );
};

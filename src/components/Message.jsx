import React from 'react';
import { Alert } from 'react-bootstrap';

const messageStyle = {
  width: '100%',
};

const Message = ({ variant, children, style, className }) => {
  return (
    <Alert
      variant={variant}
      style={{ ...messageStyle, ...style }}
      className={className}
    >
      {children}
    </Alert>
  );
};

export default Message;

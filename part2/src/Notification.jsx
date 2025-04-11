import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationStyle = {
    color: type === 'success' ? 'green' : 'red',
    background: '#f0f0f0',
    fontSize: 18,
    border: `2px solid ${type === 'success' ? 'green' : 'red'}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;

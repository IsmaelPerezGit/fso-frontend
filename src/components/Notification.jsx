import React from 'react';

const Notification = ({ message }) =>
    message === null ? null : (
        <div style={style} className='error'>
            {message}
        </div>
    );

export default Notification;

const style = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
};

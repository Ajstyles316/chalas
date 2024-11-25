import React from 'react';

export const MessageAlert = ({ message, type }) => (
    message ? (
        <div className={`mb-4 p-4 text-white rounded ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
            {message}
        </div>
    ) : null
);

import { useState } from 'react';

export const useAuth = () => {
    const [formType, setFormType] = useState('login');
    const [isHuman, setIsHuman] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    return {
        formType, setFormType,
        isHuman, setIsHuman,
        showPassword, setShowPassword,
        email, setEmail,
        message, setMessage,
        messageType, setMessageType
    };
};

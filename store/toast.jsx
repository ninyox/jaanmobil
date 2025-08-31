import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [showToast, setShowToast] = useState(false);
    const [toastmessage, settoastmessage] = useState('');
    const [titlemessage, settitlemessage] = useState('');
    const [error, setError] = useState(false);

    const openToast = (message, title, isError = false) => {
        setShowToast(true);
        settoastmessage(message);
        settitlemessage(title)
        setError(isError);
    };

    const closeToast = () => {
        setShowToast(false);
    };

    return (
        <ToastContext.Provider value={{ showToast, toastmessage,titlemessage, error, openToast, closeToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

import React, { useEffect, useState } from 'react';
import { Toast } from './toast/toast';
import { useToast } from '@/store/toast';

export function GlobalToast() {
    const { showToast, toastmessage,titlemessage, error, closeToast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Ensure the component is mounted after the initial render
        setIsMounted(true);
    }, []);

    if (!isMounted || !showToast) return null;

    return (
        <Toast
            boolean={error}
            text={toastmessage}
            title={titlemessage}
            onClose={closeToast}
        />
    );
} 
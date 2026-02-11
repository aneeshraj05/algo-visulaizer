import React, { useEffect } from 'react';
import { useAlgorithm } from '../context/AlgorithmContext';

const Breadcrumb = () => {
    const { message, setMessage } = useAlgorithm();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 4000); // Auto-hide after 4 seconds

            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    if (!message) return null;

    const isSuccess = message.type === 'success';
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
    const borderColor = isSuccess ? 'border-green-400' : 'border-red-400';

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`${bgColor} ${borderColor} border-2 px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3`}>
                <span className="text-white font-bold text-sm md:text-base">
                    {message.text}
                </span>
                <button
                    onClick={() => setMessage(null)}
                    className="text-white hover:text-gray-200 font-bold text-lg leading-none"
                    aria-label="Dismiss"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Breadcrumb;

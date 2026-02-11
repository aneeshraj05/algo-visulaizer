import React, { useState } from 'react';
import { useAlgorithm } from '../context/AlgorithmContext';
import { ALGORITHM_CODE } from '../utils/codeData';

const CodePanel = () => {
    const { algorithm, activeLine } = useAlgorithm();
    const [isOpen, setIsOpen] = useState(false); // Closed by default

    const code = ALGORITHM_CODE[algorithm] || '// Select an algorithm';
    const lines = code.split('\n');

    return (
        <div className={`fixed top-0 right-0 h-full bg-slate-800 border-l border-slate-700 shadow-2xl transition-all duration-300 z-40 ${isOpen ? 'w-80 lg:w-96' : 'w-0'}`}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -left-10 top-4 bg-slate-800 text-white px-3 py-2 rounded-l-lg border border-slate-700 border-r-0 hover:bg-slate-700 transition-colors"
                aria-label={isOpen ? 'Close Code Panel' : 'Open Code Panel'}
            >
                {isOpen ? '→' : '←'}
            </button>

            {isOpen && (
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-4 bg-slate-900 border-b border-slate-700">
                        <h3 className="font-bold text-gray-200 text-sm md:text-base" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}>
                            Source Code (Java)
                        </h3>
                    </div>

                    {/* Code Container */}
                    <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                        <pre className="font-mono text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {lines.map((line, index) => {
                                const lineNumber = index + 1;
                                const isActive = activeLine === lineNumber;

                                return (
                                    <div
                                        key={index}
                                        className={`${isActive ? 'bg-yellow-500/20 border-l-2 border-yellow-500' : ''} pl-2 transition-colors duration-200`}
                                    >
                                        <span className="text-gray-500 select-none mr-3">{lineNumber.toString().padStart(2, '0')}</span>
                                        <span className="text-blue-300">{line}</span>
                                    </div>
                                );
                            })}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodePanel;

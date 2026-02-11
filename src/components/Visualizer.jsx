import React from 'react';
import { useAlgorithm } from '../context/AlgorithmContext';
import { ARRAY_CONFIG, COLORS } from '../utils/constants';

const Visualizer = () => {
    const { array, compareIndices, swapIndices, sortedIndices, foundIndices, pointers, algorithm, target } = useAlgorithm();

    // Calculate max value for height scaling
    const maxValue = ARRAY_CONFIG.MAX_VALUE;

    // Check if searching
    const isSearching = algorithm.toLowerCase().includes('search');

    return (
        <div className="flex flex-col w-full h-full relative bg-slate-900/50 rounded-xl overflow-hidden p-2 md:p-4">
            {/* Helper text for Search */}
            {isSearching && target !== null && (
                <div className="absolute top-4 left-0 w-full text-center pointer-events-none z-10">
                    <span className="bg-slate-800/90 px-4 py-1.5 rounded-full text-blue-300 font-mono text-sm border border-slate-600 shadow-lg backdrop-blur-sm">
                        Target: {target}
                    </span>
                </div>
            )}

            <div className="flex-1 flex items-end justify-center w-full h-full gap-[1px] md:gap-1 relative">
                {array.map((item, idx) => {
                    // Determine color based on state
                    let bgColor = COLORS.DEFAULT; // bg-indigo-300

                    // Priority: Found > Swapping > Comparing > Sorted > Default
                    if (sortedIndices.includes(idx)) bgColor = COLORS.SORTED;     // bg-green-500
                    if (compareIndices.includes(idx)) bgColor = COLORS.COMPARING; // bg-yellow-400
                    if (swapIndices.includes(idx)) bgColor = COLORS.SWAPPING;     // bg-red-500
                    if (foundIndices?.includes(idx)) bgColor = COLORS.FOUND;      // bg-purple-500

                    // Dynamic height
                    const height = `${(item.value / maxValue) * 100}%`;

                    // Find pointers for this index
                    const activePointers = pointers.filter(p => p.index === idx);

                    return (
                        <div
                            key={item.id} // Stable ID is key for React reconciliation
                            className={`
                                relative flex items-end justify-center
                                rounded-t-sm md:rounded-t-md 
                                transition-all duration-300 ease-in-out 
                                ${bgColor} 
                                hover:opacity-90 group
                            `}
                            style={{
                                height: height,
                                width: `${100 / array.length}%`,
                                maxWidth: '60px' // Prevent too wide bars on small arrays
                            }}
                        >
                            {/* Pointers above bars */}
                            {activePointers.map((ptr, i) => (
                                <div
                                    key={ptr.label}
                                    className="absolute bottom-full mb-2 flex flex-col items-center z-30 transition-all duration-300"
                                >
                                    <span className={`text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded ${ptr.color || 'bg-white text-slate-900'} shadow-md whitespace-nowrap`}>
                                        {ptr.label}
                                    </span>
                                    <div className={`w-0.5 h-3 ${ptr.color || 'bg-white'}`}></div>
                                </div>
                            ))}

                            {/* Value Display: Inside bar at the top */}
                            <span
                                className="absolute left-1/2 -translate-x-1/2 select-none pointer-events-none z-20"
                                style={{
                                    top: '4px',
                                    color: '#000000',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    lineHeight: 1
                                }}
                            >
                                {item.value}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Visualizer;

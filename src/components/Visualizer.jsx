import React from 'react';
import { useAlgorithm } from '../context/AlgorithmContext';
import { ARRAY_CONFIG, COLORS } from '../utils/constants';

const Visualizer = () => {
    const { array, compareIndices, swapIndices, sortedIndices, foundIndices, algorithm, target } = useAlgorithm();

    // Calculate max value for height scaling
    const maxValue = ARRAY_CONFIG.MAX_VALUE;

    // Check if searching
    const isSearching = algorithm.toLowerCase().includes('search');

    return (
        <div className="flex flex-col w-full h-full relative">
            {/* Helper text for Search */}
            {isSearching && (
                <div className="absolute top-4 left-0 w-full text-center pointer-events-none">
                    <span className="bg-slate-800/80 px-4 py-2 rounded-full text-blue-300 font-mono text-sm border border-slate-600">
                        Target: {target}
                    </span>
                </div>
            )}

            <div className="flex-1 flex items-end justify-center w-full gap-[2px] md:gap-1">
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

                    return (
                        <div
                            key={item.id} // Stable ID is key for React reconciliation
                            className={`rounded-t-md transition-all duration-100 ease-in-out ${bgColor} hover:opacity-80 relative group`}
                            style={{
                                height: height,
                                width: `${100 / array.length}%`,
                                maxWidth: '50px'
                            }}
                        >
                            {/* Tooltip for value */}
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded pointer-events-none z-20">
                                {item.value}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Visualizer;

import React from 'react';
import { useAlgorithm } from '../context/AlgorithmContext';
import { ALGORITHMS, ARRAY_CONFIG, SPEED_CONFIG } from '../utils/constants';

const ControlPanel = () => {
    const {
        algorithm, setAlgorithm,
        size, setSize,
        speed, setSpeed,
        generateArray,
        start, reset, pause,
        isPlaying
    } = useAlgorithm();

    return (
        <div className="flex flex-wrap gap-4 items-center justify-center">
            {/* Algorithm Selector */}
            <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                disabled={isPlaying}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-sm focus:outline-none focus:border-blue-500 transition-colors"
            >
                <optgroup label="Sorting">
                    {ALGORITHMS.SORTING.map(algo => (
                        <option key={algo.value} value={algo.value}>{algo.label}</option>
                    ))}
                </optgroup>
                <optgroup label="Searching">
                    {ALGORITHMS.SEARCHING.map(algo => (
                        <option key={algo.value} value={algo.value}>{algo.label}</option>
                    ))}
                </optgroup>
            </select>

            {/* Array Size */}
            <div className="flex flex-col items-center min-w-[100px]">
                <label className="text-xs text-slate-400 mb-1">Size: {size}</label>
                <input
                    type="range"
                    min={ARRAY_CONFIG.MIN_SIZE}
                    max={ARRAY_CONFIG.MAX_SIZE}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    disabled={isPlaying}
                    className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>

            {/* Speed */}
            <div className="flex flex-col items-center min-w-[100px]">
                <label className="text-xs text-slate-400 mb-1">Speed</label>
                <input
                    type="range"
                    min={SPEED_CONFIG.MIN_SPEED}
                    max={SPEED_CONFIG.MAX_SPEED}
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    disabled={isPlaying}
                    className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={generateArray}
                    disabled={isPlaying}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors disabled:opacity-50 text-sm font-medium"
                >
                    New Array
                </button>
                {isPlaying ? (
                    <button
                        onClick={pause}
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded transition-colors text-sm font-medium"
                    >
                        Pause
                    </button>
                ) : (
                    <button
                        onClick={start}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors text-sm font-medium"
                    >
                        Start
                    </button>
                )}
            </div>
        </div>
    );
};

export default ControlPanel;

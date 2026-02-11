import React from 'react';
import { useAlgorithm } from '../context/AlgorithmContext';
import { ALGORITHMS } from '../utils/constants';

const StatsPanel = () => {
    const { stats, algorithm } = useAlgorithm();

    const getAlgoInfo = () => {
        const allAlgos = [...ALGORITHMS.SORTING, ...ALGORITHMS.SEARCHING];
        return allAlgos.find(a => a.value === algorithm) || {};
    };

    const { label, time, space } = getAlgoInfo();

    return (
        <div className="flex justify-between items-center text-sm md:text-base px-4">
            <div className="font-semibold text-blue-400">
                Algorithm: <span className="text-white normal-case">{label || algorithm}</span>
            </div>
            <div className="flex gap-6">
                <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400">Comparisons</span>
                    <span className="font-mono font-bold text-yellow-400">{stats.comparisons}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400">Swaps</span>
                    <span className="font-mono font-bold text-red-400">{stats.swaps}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400">{time ? 'Time' : ''}</span>
                    <span className="font-mono font-bold text-green-400">{time}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400">{space ? 'Space' : ''}</span>
                    <span className="font-mono font-bold text-pink-400">{space}</span>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { ARRAY_CONFIG, SPEED_CONFIG, ALGORITHMS, ANIMATION_TYPES } from '../utils/constants';
import {
    bubbleSort, insertionSort, selectionSort, mergeSort, quickSort,
    linearSearch, binarySearch
} from '../algorithms';
import { sleep } from '../utils/sleep';

const AlgorithmContext = createContext();

export const useAlgorithm = () => useContext(AlgorithmContext);

export const AlgorithmProvider = ({ children }) => {
    const [array, setArray] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSorted, setIsSorted] = useState(false);

    // Load from localStorage or use defaults
    const [algorithm, setAlgorithm] = useState(() =>
        localStorage.getItem('algo_algorithm') || ALGORITHMS.SORTING[0].value
    );
    const [speed, setSpeed] = useState(() =>
        Number(localStorage.getItem('algo_speed')) || SPEED_CONFIG.DEFAULT_SPEED
    );
    const [size, setSize] = useState(() =>
        Number(localStorage.getItem('algo_size')) || ARRAY_CONFIG.DEFAULT_SIZE
    );

    const [stats, setStats] = useState({ comparisons: 0, swaps: 0, steps: 0 });
    const [target, setTarget] = useState(null); // Target for search algorithms

    // Highlight indices for visualization
    const [compareIndices, setCompareIndices] = useState([]);
    const [swapIndices, setSwapIndices] = useState([]);
    const [sortedIndices, setSortedIndices] = useState([]);
    const [foundIndices, setFoundIndices] = useState([]);

    // Core Upgrade V5: Pointers, Breadcrumbs, Line Highlighting
    const [pointers, setPointers] = useState([]); // [{ index, label, color }]
    const [message, setMessage] = useState(null); // { type: 'success'|'error', text: string }
    const [activeLine, setActiveLine] = useState(null); // Current line number in code

    // Refs for safe access inside async loop
    const isPlayingRef = useRef(isPlaying);
    const speedRef = useRef(speed);
    const iteratorRef = useRef(null);

    // Sync refs
    useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
    useEffect(() => { speedRef.current = speed; }, [speed]);

    const generateArray = useCallback((arrSize = size) => {
        setIsPlaying(false);
        setIsSorted(false);
        setSortedIndices([]);
        setCompareIndices([]);
        setSwapIndices([]);
        setFoundIndices([]);
        setPointers([]);
        setMessage(null);
        setActiveLine(null);
        setStats({ comparisons: 0, swaps: 0, steps: 0 });
        iteratorRef.current = null;

        const newArray = [];
        for (let i = 0; i < arrSize; i++) {
            const val = Math.floor(Math.random() * (ARRAY_CONFIG.MAX_VALUE - ARRAY_CONFIG.MIN_VALUE + 1) + ARRAY_CONFIG.MIN_VALUE);
            newArray.push({ value: val, id: i });
        }
        setArray(newArray);

        // Pick a random target from the array or a random value
        // To make it fun, 70% chance it's in the array
        if (Math.random() > 0.3) {
            const randomIdx = Math.floor(Math.random() * arrSize);
            setTarget(newArray[randomIdx].value);
        } else {
            setTarget(Math.floor(Math.random() * (ARRAY_CONFIG.MAX_VALUE - ARRAY_CONFIG.MIN_VALUE + 1) + ARRAY_CONFIG.MIN_VALUE));
        }

    }, [size]);

    // Initial generation
    useEffect(() => {
        generateArray(size);
    }, [size, generateArray]);

    // Persist settings to localStorage
    useEffect(() => {
        localStorage.setItem('algo_algorithm', algorithm);
    }, [algorithm]);

    useEffect(() => {
        localStorage.setItem('algo_speed', speed);
    }, [speed]);

    useEffect(() => {
        localStorage.setItem('algo_size', size);
    }, [size]);

    // Auto-reset when algorithm changes
    useEffect(() => {
        reset();
    }, [algorithm]);

    const reset = () => {
        generateArray();
    };

    const getAlgorithmGenerator = (algoName, arr, tgt) => {
        switch (algoName) {
            // Sorting
            case 'bubbleSort': return bubbleSort(arr);
            case 'insertionSort': return insertionSort(arr);
            case 'selectionSort': return selectionSort(arr);
            case 'mergeSort': return mergeSort(arr);
            case 'quickSort': return quickSort(arr);

            // Searching
            case 'linearSearch': return linearSearch(arr, tgt);
            case 'binarySearch': return binarySearch(arr, tgt);

            default: return bubbleSort(arr);
        }
    };

    const runAnimation = async () => {
        if (!iteratorRef.current) {
            iteratorRef.current = getAlgorithmGenerator(algorithm, array, target);
        }

        while (isPlayingRef.current) {
            const { value: step, done } = iteratorRef.current.next();

            if (done) {
                setIsPlaying(false);
                setIsSorted(true);
                iteratorRef.current = null;
                setCompareIndices([]);
                setSwapIndices([]);
                setPointers([]);
                return;
            }

            // Update pointers if present
            if (step.pointers) {
                setPointers(step.pointers);
            } else {
                setPointers([]);
            }

            // Update message if present
            if (step.message) {
                setMessage(step.message);
            }

            // Update active line if present
            if (step.line !== undefined) {
                setActiveLine(step.line);
            }

            // Handle Step
            if (step.type === ANIMATION_TYPES.COMPARE) {
                setCompareIndices(step.indices);
                setSwapIndices([]);
                setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
            } else if (step.type === ANIMATION_TYPES.SWAP) {
                setSwapIndices(step.indices);
                setArray(prev => {
                    const newArr = [...prev];
                    const [i, j] = step.indices;
                    const temp = newArr[i];
                    newArr[i] = newArr[j]; // Swap objects
                    newArr[j] = temp;
                    return newArr;
                });
                setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
            } else if (step.type === ANIMATION_TYPES.OVERWRITE) {
                setSwapIndices(step.indices); // Highlight being overwritten
                setArray(prev => {
                    const newArr = [...prev];
                    const [index] = step.indices;
                    newArr[index] = { ...newArr[index], value: step.value };
                    return newArr;
                });
            } else if (step.type === ANIMATION_TYPES.SORTED) {
                setSortedIndices(prev => {
                    const newSet = new Set([...prev, ...step.indices]);
                    return Array.from(newSet);
                });
                setCompareIndices([]);
                setSwapIndices([]);
            } else if (step.type === ANIMATION_TYPES.FOUND) {
                setFoundIndices(prev => [...prev, ...step.indices]);
                setCompareIndices([]);
            }

            // Variable delay based on speed (slower for better visibility)
            // Speed 1-100: Slowest (1) = 1000ms, Fastest (100) = 50ms
            const ms = Math.max(50, 1000 - (speedRef.current * 9.5));
            await sleep(ms);
        }
    };

    // Trigger animation when playing starts
    useEffect(() => {
        if (isPlaying) {
            runAnimation();
        }
    }, [isPlaying]);

    const start = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);

    const value = {
        array,
        setArray,
        algorithm,
        setAlgorithm,
        speed,
        setSpeed,
        size,
        setSize,
        target,
        setTarget,
        isPlaying,
        isSorted,
        stats,
        generateArray,
        compareIndices,
        swapIndices,
        sortedIndices,
        foundIndices,
        pointers,
        message,
        setMessage,
        activeLine,
        start,
        reset,
        pause
    };

    return (
        <AlgorithmContext.Provider value={value}>
            {children}
        </AlgorithmContext.Provider>
    );
};

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { ARRAY_CONFIG, SPEED_CONFIG, ALGORITHMS, ANIMATION_TYPES } from '../utils/constants';
import {
    bubbleSort, insertionSort, selectionSort, mergeSort, quickSort, heapSort,
    linearSearch, binarySearch, jumpSearch, interpolationSearch
} from '../algorithms';
import { sleep } from '../utils/sleep';

const AlgorithmContext = createContext();

export const useAlgorithm = () => useContext(AlgorithmContext);

export const AlgorithmProvider = ({ children }) => {
    const [array, setArray] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [algorithm, setAlgorithm] = useState(ALGORITHMS.SORTING[0].value);
    const [speed, setSpeed] = useState(SPEED_CONFIG.DEFAULT_SPEED);
    const [size, setSize] = useState(ARRAY_CONFIG.DEFAULT_SIZE);
    const [stats, setStats] = useState({ comparisons: 0, swaps: 0, steps: 0 });
    const [target, setTarget] = useState(null); // Target for search algorithms

    // Highlight indices for visualization
    const [compareIndices, setCompareIndices] = useState([]);
    const [swapIndices, setSwapIndices] = useState([]);
    const [sortedIndices, setSortedIndices] = useState([]);
    const [foundIndices, setFoundIndices] = useState([]);

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
            case 'heapSort': return heapSort(arr);

            // Searching
            case 'linearSearch': return linearSearch(arr, tgt);
            case 'binarySearch': return binarySearch(arr, tgt);
            case 'jumpSearch': return jumpSearch(arr, tgt);
            case 'interpolationSearch': return interpolationSearch(arr, tgt);

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
                // keep found indices?
                setCompareIndices([]);
                setSwapIndices([]);
                return;
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
                    // For Merge Sort, we are replacing the Value at index with new Value
                    // But we want to keep the object ID if possible? 
                    // Actually, if we overwrite, we lose the original object ID tracking if we are not careful.
                    // But for simple bar chart, ID is for key.
                    // If we reuse ID from the original array?
                    // Merge Sort logic passed value.
                    // We can just update value.
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

            // Variable delay based on speed
            const ms = Math.max(5, 500 - (speedRef.current * 4.9));
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
        isPlaying,
        isSorted,
        stats,
        generateArray,
        compareIndices,
        swapIndices,
        sortedIndices,
        foundIndices,
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

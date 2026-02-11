export const ALGORITHMS = {
    SORTING: [
        { value: 'bubbleSort', label: 'Bubble Sort', time: 'O(n²)', space: 'O(1)' },
        { value: 'insertionSort', label: 'Insertion Sort', time: 'O(n²)', space: 'O(1)' },
        { value: 'selectionSort', label: 'Selection Sort', time: 'O(n²)', space: 'O(1)' },
        { value: 'mergeSort', label: 'Merge Sort', time: 'O(n log n)', space: 'O(n)' },
        { value: 'quickSort', label: 'Quick Sort', time: 'O(n log n)', space: 'O(log n)' },
        { value: 'heapSort', label: 'Heap Sort', time: 'O(n log n)', space: 'O(1)' },
    ],
    SEARCHING: [
        { value: 'linearSearch', label: 'Linear Search', time: 'O(n)', space: 'O(1)' },
        { value: 'binarySearch', label: 'Binary Search', time: 'O(log n)', space: 'O(1)' },
        { value: 'jumpSearch', label: 'Jump Search', time: 'O(√n)', space: 'O(1)' },
        { value: 'interpolationSearch', label: 'Interpolation Search', time: 'O(log(log n))', space: 'O(1)' },
    ]
};

export const ARRAY_CONFIG = {
    MIN_SIZE: 5,
    MAX_SIZE: 100,
    DEFAULT_SIZE: 20,
    MIN_VALUE: 5,
    MAX_VALUE: 100,
};

export const SPEED_CONFIG = {
    MIN_SPEED: 1,
    MAX_SPEED: 100,
    DEFAULT_SPEED: 50,
};

export const COLORS = {
    DEFAULT: 'bg-indigo-300',
    COMPARING: 'bg-yellow-400',
    SWAPPING: 'bg-red-500',
    SORTED: 'bg-green-500',
    FOUND: 'bg-purple-500',
    PIVOT: 'bg-pink-500',
};

export const ANIMATION_TYPES = {
    COMPARE: 'compare',
    SWAP: 'swap',
    OVERWRITE: 'overwrite',
    SORTED: 'sorted',
    FOUND: 'found',
};

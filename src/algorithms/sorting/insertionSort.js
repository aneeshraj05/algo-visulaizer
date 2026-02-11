import { ANIMATION_TYPES } from '../../utils/constants';

export function* insertionSort(array) {
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        let current = arr[i];
        let j = i - 1;

        // Highlight current element being inserted
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [i]
        };

        while (j >= 0 && arr[j].value > current.value) {
            // Compare
            yield {
                type: ANIMATION_TYPES.COMPARE,
                indices: [j, j + 1]
            };

            // Shift (conceptually a swap for visualization, or overwrite)
            // Visualizing as swap is easier for bars
            arr[j + 1] = arr[j];

            yield {
                type: ANIMATION_TYPES.SWAP,
                indices: [j, j + 1]
            };

            arr[j] = current; // Temporarily place it here to visualize movement
            j--;
        }
        arr[j + 1] = current;

        // Mark sorted portion? Insertion sort builds sorted sublist
        // Hard to mark "sorted" permanently until end, but we can flash
    }

    // Mark all sorted
    for (let i = 0; i < n; i++) {
        yield {
            type: ANIMATION_TYPES.SORTED,
            indices: [i]
        };
    }
}

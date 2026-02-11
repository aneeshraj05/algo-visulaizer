import { ANIMATION_TYPES } from '../../utils/constants';

/**
 * Bubble Sort Generator
 * Yields steps for visualization
 * @param {Array} array - The array to sort
 */
export function* bubbleSort(array) {
    const arr = [...array]; // Work on a copy
    const n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            // Compare
            yield {
                type: ANIMATION_TYPES.COMPARE,
                indices: [j, j + 1],
            };

            if (arr[j].value > arr[j + 1].value) {
                // Swap
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;

                yield {
                    type: ANIMATION_TYPES.SWAP,
                    indices: [j, j + 1],
                    values: [arr[j], arr[j + 1]] // Optional, if we want to force update values
                };
            }
        }
        // Mark last element as sorted
        yield {
            type: ANIMATION_TYPES.SORTED,
            indices: [n - i - 1]
        };

        if (!swapped) {
            // Optimization: if no swaps, rest is sorted
            for (let k = 0; k < n - i - 1; k++) {
                yield {
                    type: ANIMATION_TYPES.SORTED,
                    indices: [k]
                };
            }
            break;
        }
    }

    // Ensure all are marked sorted (especially 0th index)
    yield {
        type: ANIMATION_TYPES.SORTED,
        indices: [0]
    };
}

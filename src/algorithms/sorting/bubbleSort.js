import { ANIMATION_TYPES } from "../../utils/constants";

/**
 * BUBBLE SORT ALGORITHM
 * 
 * Description:
 * Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in the wrong order.
 * The pass through the list is repeated until the list is sorted.
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * How it works:
 * 1. Start from the beginning of the array
 * 2. Compare each pair of adjacent elements
 * 3. If they are in wrong order, swap them
 * 4. After each pass, the largest element "bubbles up" to its correct position
 * 5. Repeat until no swaps are needed
 */
export function* bubbleSort(array) {
    const arr = [...array]; // Create a copy to avoid mutating original
    const n = arr.length;

    // Outer loop: controls number of passes through the array
    for (let i = 0; i < n - 1; i++) {

        // Inner loop: compares adjacent elements
        // Note: We reduce the range by 'i' because the last 'i' elements are already sorted
        for (let j = 0; j < n - i - 1; j++) {

            // STEP 1: Compare adjacent elements
            // Show yellow highlight on elements being compared
            yield {
                type: ANIMATION_TYPES.COMPARE,
                indices: [j, j + 1],
                pointers: [
                    { index: j, label: 'j', color: 'bg-yellow-400' },
                    { index: j + 1, label: 'j+1', color: 'bg-blue-400' }
                ],
                line: 5
            };

            // STEP 2: If elements are in wrong order, swap them
            if (arr[j].value > arr[j + 1].value) {

                // Show red highlight during swap
                yield {
                    type: ANIMATION_TYPES.SWAP,
                    indices: [j, j + 1],
                    pointers: [
                        { index: j, label: 'j', color: 'bg-red-500' },
                        { index: j + 1, label: 'j+1', color: 'bg-red-500' }
                    ],
                    line: 7
                };

                // Perform the actual swap
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }

        // STEP 3: Mark the last element of this pass as sorted (green)
        yield {
            type: ANIMATION_TYPES.SORTED,
            indices: [n - i - 1],
            pointers: [],
            line: 11
        };
    }

    // STEP 4: Mark all elements as sorted
    const allIndices = Array.from({ length: n }, (_, i) => i);
    yield {
        type: ANIMATION_TYPES.SORTED,
        indices: allIndices,
        pointers: []
    };
}

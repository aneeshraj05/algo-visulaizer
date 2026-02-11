import { ANIMATION_TYPES } from "../../utils/constants";

/**
 * INSERTION SORT ALGORITHM
 * 
 * Description:
 * Insertion Sort builds the final sorted array one item at a time.
 * It takes each element and inserts it into its correct position in the sorted portion.
 * Similar to how you might sort playing cards in your hands.
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * How it works:
 * 1. Start with the second element (assume first is sorted)
 * 2. Pick the current element as the "key"
 * 3. Compare key with elements in the sorted portion (to its left)
 * 4. Shift larger elements one position to the right
 * 5. Insert the key in its correct position
 * 6. Repeat for all elements
 */
export function* insertionSort(array) {
    const arr = [...array]; // Create a copy to avoid mutating original
    const n = arr.length;

    // Start from second element (index 1)
    // First element is considered already sorted
    for (let i = 1; i < n; i++) {

        // STEP 1: Pick the current element as "key"
        let key = arr[i];
        let j = i - 1;

        // Show the key element being picked
        yield {
            type: ANIMATION_TYPES.COMPARE,
            indices: [i],
            pointers: [
                { index: i, label: 'key', color: 'bg-purple-500' }
            ],
            line: 4
        };

        // STEP 2: Compare key with elements in sorted portion
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j].value > key.value) {

            // Show comparison between key and current element
            yield {
                type: ANIMATION_TYPES.COMPARE,
                indices: [j, j + 1],
                pointers: [
                    { index: j, label: 'j', color: 'bg-yellow-400' },
                    { index: i, label: 'key', color: 'bg-purple-500' }
                ],
                line: 6
            };

            // STEP 3: Shift element to the right
            yield {
                type: ANIMATION_TYPES.SWAP,
                indices: [j, j + 1],
                pointers: [
                    { index: j, label: 'shift', color: 'bg-red-500' }
                ],
                line: 7
            };

            // Perform the shift
            arr[j + 1] = arr[j];
            j--;
        }

        // STEP 4: Insert key in its correct position
        arr[j + 1] = key;
    }

    // STEP 5: Mark all elements as sorted
    const allIndices = Array.from({ length: n }, (_, i) => i);
    yield {
        type: ANIMATION_TYPES.SORTED,
        indices: allIndices,
        pointers: []
    };
}
